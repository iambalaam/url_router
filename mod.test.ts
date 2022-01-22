import {
  ConnInfo,
  Handler,
} from "https://deno.land/std@0.122.0/http/server.ts";
import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import { router, Routes } from "./mod.ts";

const BASE_URL = "https://deno.land";
function createMockRequest(url: string): Request {
  return { url } as Request;
}
interface MockFn {
  calls: number;
  (): void;
}
function createMockFunction(): MockFn {
  const fn = () => {
    (fn as MockFn).calls = ((fn as MockFn).calls || 0) + 1;
  };
  return fn as MockFn;
}
const MOCK_CONN_INFO = undefined as any as ConnInfo;

Deno.test("* catches all routes", () => {
  const req = createMockRequest(BASE_URL);
  const fn = createMockFunction();

  const all: Routes = [
    [new URLPattern({ pathname: "/" }), fn as any as Handler],
  ];

  router(all)(req, MOCK_CONN_INFO);
  assertEquals(fn.calls, 1);
});
