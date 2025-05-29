import { inspect } from "node:util";

export function logFullObject(obj: Parameters<typeof inspect>[0]) {
  console.log(inspect(obj, { depth: null, colors: true }));
}
