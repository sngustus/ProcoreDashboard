import AuthContext from "./contexts/auth";
import ParentContext from "./contexts/parent";
/**
 * Configuration to pass into authenticate.
 */
interface AuthenticationConfig {
    /** URL to open in auth window */
    url: string;
    /** Height of the auth window, defaults to 600 */
    height?: number;
    /** Width of the auth window, defaults to 560 */
    width?: number;
    /** Callback to run if authentication fails */
    onFailure: (error: any) => void;
    /** Callback to run if authentication succeeds */
    onSuccess: (payload: any) => void;
}
/**
 * Responsible for creating and managing auth popups. When used in
 * ParentContext, will launch a new window for auth. When used in an
 * AuthContext, can be used to send success / failure messages back to the
 * parent window.
 */
export default class Authentication {
    authWindow: Window | undefined | null;
    onAuthSuccess?: (payload: any) => void;
    onAuthFailure?: (error: any) => void;
    monitor?: number;
    context: ParentContext | AuthContext;
    constructor(context: ParentContext | AuthContext);
    /**
     * Used to launch an authentication window. After the user either finishes
     * the authentication flow successfully, or bails out early, one of the
     * handlers will be called.
     *
     * @param config Configuration for the authenticate call. Specifies URL and
     * success / failure handlers
     */
    authenticate: (config: AuthenticationConfig) => void;
    /**
     * For use when in the [[AuthContext]]. Will notify the parent window that
     * authentication was completed successfully.
     *
     * @param payload Can be anything the user specifies. Will be passed onto
     * onSuccess in [[AuthContext]]
     */
    notifySuccess: (payload: any) => void;
    /**
     * For use when in the [[AuthContext]]. Will notify the parent window that
     * authentication has failed.
     *
     * @param payload Can be anything the user specifies. Will be passed onto
     * onFailure in [[AuthContext]]
     */
    notifyFailure: (payload: any) => void;
    /**
     * Internal method which forwards a message onto the configured success
     * handler, and does cleanup on the auth window
     *
     * @ignore
     */
    handleSuccessMessage: (payload: any) => void;
    /**
     * Internal method which forwards a message onto the configured failure
     * handler, and does cleanup on the auth window
     *
     * @ignore
     */
    handleFailureMessage: (error: any) => void;
    /**
     * Clears the monitor interval, which polls every 100ms to check if the auth
     * window was closed by the user
     */
    private clearMonitor;
}
export {};
