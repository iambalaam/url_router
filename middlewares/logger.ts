import { Middleware } from '../mod.ts'

export const logger: Middleware = async (req: Request, next) => { 
  const startTime = Date.now();
  const result = await (next(req)) as Response;
  const endTime = Date.now();
  const ms = endTime - startTime;
  
  const { pathname } = new URL(req.url);
  console.log(`[${result.status}] (${ms}ms) ${pathname}`);
  return result;
}