interface PatchOperation {
    op: 'add' |
        'remove' |
        'replace' |
        'move' |
        'copy' |
        'test',
    path: string,
    value: any
}

export function createPatch(left: any, right: any): string;

export function applyPatch<T>(doc: T, right: PatchOperation[]): T;
