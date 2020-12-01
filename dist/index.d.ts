import AuthContext from "./contexts/auth";
import ParentContext from "./contexts/parent";
/**
 * Entry point to the module. Will return the appropriate context for the
 * environment.
 */
export declare function initialize(): AuthContext | ParentContext;
