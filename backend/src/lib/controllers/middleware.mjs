import jwt from "jsonwebtoken"

function middlewareAuthorization (request, response, next) {
    try {
        const [_, token] = request.headers.authorization.split(" ")
        const authorizationData = jwt.verify(token, process.env.JWT_SECRET)
        response.locals.authorization = authorizationData
        return next()
    } catch (exception) {
        resposta.sendStatus(403)
    }
}

export {
    middlewareAuthorization
}