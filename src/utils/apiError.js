class ApiError extends Error {
    constructor (
        statusCode,
        message = "Some thing went wrong",
        errors = [],
        stack = ""
    ){
        super(message),
        this.statusCode = statusCode,
        this.data = null,
        this.error = errors,
        this.success = false
        if (stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}