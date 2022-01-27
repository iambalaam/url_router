import { Handler } from "https://deno.land/std/http/server.ts";

export type Next = (value: any) => Promise<Response>;
export type Middleware = (value: any, next: Next) => (Response | Promise<Response>);
export type Routes = [URLPattern, Middleware[]][];

export function router(routes: Routes): Handler {
  return async (req, _connInfo) => {
    for (const [pattern, middlewares] of routes) {
      if (pattern.test(req.url)) {
        
        // Create array of next() functions
        // These are responsible for passing a value to the next middleware
        const nexts = new Array(middlewares.length);
        nexts[nexts.length - 1] = function last() {
          throw new Error("Last middleware cannot call next()");
        };
        for (let i = nexts.length - 2; i >= 0; i--) {
          nexts[i] = (value: unknown) => middlewares[i + 1](value, nexts[i + 1]);
        }

        return await middlewares[0](req, nexts[0]);
      }
    }
    throw new Error("404");
  };
}
