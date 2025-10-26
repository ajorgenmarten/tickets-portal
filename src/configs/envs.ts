import { z } from "zod";

const schemaObject = z.object({
  VITE_BACKEND_URL: z.string().default("http://indefinitacodicis.com:9091"),
});

const { error, data } = schemaObject.safeParse(import.meta.env);

if (error) {
  console.error("Invalid environment variables:", error);
  throw error;
}

export default data;
