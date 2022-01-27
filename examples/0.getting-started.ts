import { serve } from "https://deno.land/std@0.122.0/http/server.ts";
import { router, Routes, Middleware } from "../mod.ts";
import { logger } from '../middlewares/logger.ts'

const handler: Middleware = (_req) => new Response("hello noobs");
const notFound: Middleware = (_req) => new Response("404");
const slow: Middleware = async (_req) => {
  await new Promise((res) => setTimeout(res, 1000));
  return new Response("hello noobs");
}
const routes: Routes = [
  [new URLPattern({ pathname: "/" }), [logger, handler]],
  [new URLPattern({ pathname: "/slow" }), [logger, slow]],
  [new URLPattern({ pathname: "*" }), [logger, notFound]],
];

console.log(`🦕 Deno server running at http://localhost:8000}/ 🦕`);
await serve(router(routes));
