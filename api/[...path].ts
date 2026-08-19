// Vercel treats this catch-all file as a serverless function. The shared Express
// app continues to receive the original /api/* path, including /api/trpc calls.
import app from "../server/app";

export default app;
