import z from "zod";

const authenticateSchemaName = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  avatar: z.string().optional(),
});

const refreshAccessTokenSchema = z.object({
  "refresh-token": z.string(),
});

export { authenticateSchemaName, refreshAccessTokenSchema };
