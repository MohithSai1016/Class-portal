function getEmailProvider() {
    /*
     * Provider adapter placeholder.
     *
     * Configure an email provider in a later deployment step.
     * Never put provider API keys in frontend JavaScript.
     */
    return {
        name: "none",
        async send() {
            throw new Error(
                "Email provider is not configured"
            );
        }
    };
}

function getPushProvider() {
    /*
     * Push provider adapter placeholder.
     * Firebase/another provider can be connected later.
     */
    return {
        name: "none",
        async send() {
            throw new Error(
                "Push provider is not configured"
            );
        }
    };
}

module.exports = {
    getEmailProvider,
    getPushProvider
};
