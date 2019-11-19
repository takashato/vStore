class ResponseBuilder {
    static SUCCESS = 200;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static INTERNAL_ERROR = 500;

    static error(h, statusCode = this.BAD_REQUEST, userMessage = '', code = '', internalMessage = null, traceId = null) {
        return h.response({
            userMessage: userMessage,
            code: code,
            internalMessage: internalMessage,
            traceId: traceId,
        }).code(statusCode);
    }

    static inputError (h, userMessage = '', code = '', internalMessage = null, traceId = null) {
        return this.error(h, this.BAD_REQUEST, userMessage, code, internalMessage, traceId);
    }
}

export default ResponseBuilder;