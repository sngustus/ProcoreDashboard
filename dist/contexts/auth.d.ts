import Authentication from "../authentication";
/**
 * Authentication Context. Created when this utility is loaded within an
 * authentication popup.
 */
export default class AuthContext {
    authentication: Authentication;
    parentWindow: Window;
    window: Window;
    constructor();
}
