import type { JSONOutput } from 'typedoc';
import { ReflectionKind } from 'typedoc/models';

export function getModuleMethodSignatures(module: JSONOutput.DeclarationReflection) {
	let defaultFuncID = -1;
	const moduleMethods: { id: number; signatures: JSONOutput.SignatureReflection[] }[] = [];

	for (const child of module.children ?? []) {
		if (child.kind === ReflectionKind.TypeAlias) continue;

		if (child.kind === ReflectionKind.Reference) {
			if (child.name === 'default') defaultFuncID = (child as JSONOutput.ReferenceReflection).target;
		} else if (child.kind === ReflectionKind.Function) {
			const { id, signatures } = child;
			if (signatures) moduleMethods.push({ id, signatures });
		} else {
			let { signatures } = child;

			if (!signatures && child.type?.type === 'reflection' && child.type.declaration.signatures) {
				signatures = child.type.declaration.signatures;
			}

			if (signatures) {
				moduleMethods.push({
					id: child.id,
					signatures: signatures.map((signature) =>
						signature.name === '__type'
							? {
									...signature,
									name: child.name === '__type' ? module.name : child.name,
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
