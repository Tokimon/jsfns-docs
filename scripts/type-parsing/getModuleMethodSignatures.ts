import { ReflectionKind } from "typedoc";
import type {
  Kind_Function,
  Kind_Module,
  Kind_Signature,
  Kind_Variable,
} from "~docs/types";

export function getModuleMethodSignatures(module: Kind_Module) {
  let defaultFuncID = -1;
  const moduleMethods: { id: number; signatures: Kind_Signature[] }[] = [];

  for (const child of module.children) {
    if (child.kind === ReflectionKind.TypeAlias) continue;

    if (child.kind === ReflectionKind.Reference) {
      if (child.name === "default") defaultFuncID = child.target;
    } else if (child.kind === ReflectionKind.Function) {
      const { id, signatures } = child;
      moduleMethods.push({ id, signatures });
    } else {
      let { signatures } = child;

      if (
        !signatures &&
        child.type?.type === "reflection" &&
        child.type.declaration.signatures
      ) {
        signatures = child.type.declaration.signatures;
      }

      if (signatures) {
        moduleMethods.push({
          id: child.id,
          signatures: signatures.map((signature) =>
            signature.name === "__type"
              ? {
                  ...signature,
                  name: child.name === "__type" ? module.name : child.name,
                }
              : signature,
          ),
        });
      }
    }
  }

  moduleMethods.sort((a, b) => {
    if (a.id === defaultFuncID) return -1;
    if (b.id === defaultFuncID) return 1;
    return 0;
  });

  return moduleMethods.flatMap(({ signatures }) => signatures);
}
