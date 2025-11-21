import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { getAllFunctions } from "@/inngest/functions";

// Load functions dynamically
let functionsPromise: Promise<any[]> | null = null;

function getFunctions(): Promise<any[]> {
  if (!functionsPromise) {
    functionsPromise = getAllFunctions();
  }
  return functionsPromise;
}

// Inngest serve expects synchronous functions array, so we initialize on module load
let loadedFunctions: any[] = [];

getFunctions().then((functions) => {
  loadedFunctions = functions;
}).catch(console.error);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: loadedFunctions,
});
