import jwt from "jsonwebtoken"

function middlewareAuthorization (request, response, next) {
    try {
        const [_, token] = request.headers.authorization.split(" ")
        response.locals.authorization = jwt.verify(token, process.env.JWT_SECRET)
        return next()
    } catch (exception) {
        response.sendStatus(403)
    }
}

export {
    middlewareAuthorization
}