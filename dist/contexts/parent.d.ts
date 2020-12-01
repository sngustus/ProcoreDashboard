import Authentication from "../authentication";
/**
 * Parent Context. Instantiated when initialize is called from the iframed
 * application.
 */
export default class ParentContext {
    window: Window;
    parentWindow: Window;
    authentication: Authentication;
    constructor();
    /**
     * Handler for the postMessage browser API. Will reject any messages not sent
     * from the same origin as the iframe, or those that do not come in as an
     * object.
     *
     * @param event The browser MessageEvent
     */
    private processMessage;
}
