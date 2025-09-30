import { Project, Node, SyntaxKind } from 'ts-morph';
import { join, relative, dirname } from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

// Configuration
const FUNCTIONS_DIR = join(process.cwd(), 'src/inngest/functions');
const ZOD_IMPORT = `import { z } from "zod";\n`;
const WORKFLOW_IMPORT_OUTPUT = join(process.cwd(), 'scripts/addWorkflowTemplates.ts');

// --- Types ---
interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  options?: any[];
  [key: string]: any;
}

interface FieldDefinition {
  key: string;
  type: string;
  validation?: FieldValidation;
  defaultValue?: any;
  [key: string]: any;
}

// --- Map field types to Zod ---
const typeToZod: Record<string, string> = {
  text: "z.string()",
  number: "z.number()",
  boolean: "z.boolean()",
  select: "z.string()",
  multiselect: "z.array(z.string())",
  date: "z.string().datetime()",
  email: "z.string().email()",
  url: "z.string().url()",
  json: "z.record(z.any())",
};

// --- Convert field definition to Zod schema ---
function fieldToZod(field: FieldDefinition): string {
  let zodType = typeToZod[field.type] ?? "z.any()";
  const validations: string[] = [];

  const validation = field.validation;
  if (validation) {
    if (typeof validation.min === "number") validations.push(`min(${validation.min})`);
    if (typeof validation.max === "number") validations.push(`max(${validation.max})`);
    if (validation.options && Array.isArray(validation.options)) {
      const opts = validation.options.map(o => JSON.stringify(o)).join(", ");
      validations.push(`refine(val => [${opts}].includes(val), { message: "Invalid option" })`);
    }
  }

  let result = zodType + (validations.length ? "." + validations.join(".") : "");
  if (field.defaultValue !== undefined) result += `.default(${JSON.stringify(field.defaultValue)})`;
  if (!validation?.required) result += ".optional()";
  return result;
}

// --- Generate input schema + inferred types ---
function generateInputSchema(fields: FieldDefinition[], workflowName: string): string {
  const inputFields = fields.map(f => `  ${f.key}: ${fieldToZod(f)},`).join("\n");
  const pascalName = workflowName.charAt(0).toUpperCase() + workflowName.slice(1);
  const inputSchemaName = `Workflow${pascalName}InputSchema`;
  const inputTypeName = `Workflow${pascalName}Input`;
  const eventSchemaName = `Workflow${pascalName}EventSchema`;
  const eventTypeName = `Workflow${pascalName}Event`;

  return `
// Input schema & type for ${workflowName}
export const ${inputSchemaName} = z.object({
${inputFields}
});
export type ${inputTypeName} = z.infer<typeof ${inputSchemaName}>;

// Event schema & type for workflow/${workflowName.toLowerCase()} event
export const ${eventSchemaName} = z.object({
  input: ${inputSchemaName},
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type ${eventTypeName} = z.infer<typeof ${eventSchemaName}>;
`;
}

// --- Process metadata file ---
async function processMetadataFile(filePath: string): Promise<{templateNames: string[], importPath: string}> {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  // --- Zod schemas ---
  const fieldsExport = sourceFile.getVariableDeclaration(dec =>
    dec.getName().toLowerCase().endsWith("fields")
  );

  if (fieldsExport) {
    const workflowName = fieldsExport.getName().replace(/Fields?$/i, "");
    const initializer = fieldsExport.getInitializer();

    if (initializer && Node.isArrayLiteralExpression(initializer)) {
      const fields: FieldDefinition[] = initializer.getElements()
        .filter(Node.isObjectLiteralExpression)
        .map(obj => {
          const field: FieldDefinition = { key: "", type: "text" };
          obj.getProperties().forEach(prop => {
            if (Node.isPropertyAssignment(prop)) {
              const name = prop.getName();
              const init = prop.getInitializer();
              if (!init) return;
              if (Node.isStringLiteral(init)) field[name] = init.getLiteralValue();
              else if (Node.isNumericLiteral(init)) field[name] = Number(init.getText());
              else if (init.getKind() === SyntaxKind.TrueKeyword) field[name] = true;
              else if (init.getKind() === SyntaxKind.FalseKeyword) field[name] = false;
              else if (Node.isArrayLiteralExpression(init)) field[name] = init.getElements().map(e => e.getText());
              else if (Node.isObjectLiteralExpression(init) && name === "validation") {
                const validation: Record<string, any> = {};
                init.getProperties().forEach(vProp => {
                  if (Node.isPropertyAssignment(vProp)) {
                    const vName = vProp.getName();
                    const vInit = vProp.getInitializer();
                    if (!vInit) return;
                    if (Node.isStringLiteral(vInit)) validation[vName] = vInit.getLiteralValue();
                    else if (Node.isNumericLiteral(vInit)) validation[vName] = Number(vInit.getText());
                    else if (vInit.getKind() === SyntaxKind.TrueKeyword) validation[vName] = true;
                    else if (vInit.getKind() === SyntaxKind.FalseKeyword) validation[vName] = false;
                    else if (Node.isArrayLiteralExpression(vInit)) validation[vName] = vInit.getElements().map(e => e.getText());
                  }
                });
                field.validation = validation;
              }
            }
          });
          return field;
        });

      const pascalName = workflowName.charAt(0).toUpperCase() + workflowName.slice(1);
      const inputSchemaName = `Workflow${pascalName}InputSchema`;

      let content = readFileSync(filePath, "utf-8");

      // only inject if schema does not already exist
      if (!content.includes(`export const ${inputSchemaName}`)) {
        if (!content.includes(`from "zod"`)) content = ZOD_IMPORT + content;

        const schemaCode = generateInputSchema(fields, workflowName);
        content = content.trimEnd() + "\n\n" + schemaCode;

        writeFileSync(filePath, content, "utf-8");
        console.log(`✅ Added Zod schema & types for ${filePath}`);
      } else {
        console.log(`ℹ️ Schema already exists in ${filePath}, skipped`);
      }
    }
  }

  // --- Collect Template exports ---
  const templateExports = sourceFile.getVariableDeclarations()
    .filter(v => v.getName().endsWith("Template"))
    .map(v => v.getName());

  // Compute relative import path from scripts folder
  const relativePath = './' + relative(dirname(WORKFLOW_IMPORT_OUTPUT), filePath).replace(/\.ts$/, "");

  return { templateNames: templateExports, importPath: relativePath };
}

// --- Main ---
async function main() {
  if (!existsSync(FUNCTIONS_DIR)) {
    console.error(`❌ Functions directory not found: ${FUNCTIONS_DIR}`);
    process.exit(1);
  }

  const metadataFiles = glob.sync(`${FUNCTIONS_DIR}/**/metadata.ts`);
  if (metadataFiles.length === 0) {
    console.log("ℹ️ No metadata.ts files found");
    return;
  }

  const imports: string[] = [];
  const allTemplateNames: string[] = [];

  for (const file of metadataFiles) {
    try {
      console.log(`Processing ${file}...`);
      const { templateNames, importPath } = await processMetadataFile(file);
      if (templateNames.length > 0) {
        imports.push(`import { ${templateNames.join(", ")} } from "${importPath}";`);
        imports.push('import prisma from "@/lib/prisma";');
        allTemplateNames.push(...templateNames);
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err);
    }
  }

  // Deduplicate
  const uniqueImports = Array.from(new Set(imports));
  const uniqueTemplateNames = Array.from(new Set(allTemplateNames));

  // --- Generate addWorkflowTemplates.ts ---
  const outputContent = `
// AUTO-GENERATED FILE
${uniqueImports.join("\n")}

import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";

addWorkflowTemplatesIfNotExist(prisma, [
  ${uniqueTemplateNames.join(",\n  ")}
]);
`;

  writeFileSync(WORKFLOW_IMPORT_OUTPUT, outputContent.trim(), "utf-8");
  console.log(`🎉 Generated workflow templates file at ${WORKFLOW_IMPORT_OUTPUT}`);
}

main().catch(console.error);
