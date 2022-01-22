import { Handler } from "https://deno.land/std@0.122.0/http/server.ts";
export type Routes = [URLPattern, Handler][];

export function router(routes: Routes): Handler {
  return async (req, connInfo) => {
    for (const [pattern, handler] of routes) {
      if (pattern.test(req.url)) {
        return await handler(req, connInfo);
      }
    }
    throw new Error("404");
  };
}
