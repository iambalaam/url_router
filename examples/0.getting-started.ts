import { Handler, serve } from "https://deno.land/std@0.122.0/http/server.ts";
import { router, Routes } from "../mod.ts";

const PORT = 8000;

const handler: Handler = (_req) => new Response("hello noobs");
const notFound: Handler = (_req) => new Response("404");

const routes: Routes = [
  [new URLPattern({ pathname: "/" }), handler],
  [new URLPattern({ pathname: "*" }), notFound],
];

console.log(`🦕 Deno server running at http://localhost:${PORT}/ 🦕`);
await serve(router(routes), { port: PORT });
