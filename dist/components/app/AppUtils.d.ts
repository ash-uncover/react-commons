import { AppNode } from './AppNode';
import { AppNodeDef } from './AppNodeDef';
export declare function resolveApp(root: AppNode): AppNodeDef[];
export declare function getParent(nodeDef: AppNodeDef): AppNodeDef | null;
export declare function findNodeDef(nodeDefs: AppNodeDef[], path: string): AppNodeDef | null;
