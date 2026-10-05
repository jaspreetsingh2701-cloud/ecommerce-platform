import { setImmediate, clearImmediate } from "node:timers";
import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";

globalThis.setImmediate = setImmediate;
globalThis.clearImmediate = clearImmediate;

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());