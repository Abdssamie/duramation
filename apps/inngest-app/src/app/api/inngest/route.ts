import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import * as functions from "@/inngest/functions";

// Extract all exported functions
const allFunctions = Object.values(functions).filter(
  (fn) => fn && typeof fn === 'object' && 'id' in fn
);

console.log(`[Inngest] Registering ${allFunctions.length} functions`);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: allFunctions,
});
