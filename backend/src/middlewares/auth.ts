import { Request, Response, NextFunction } from 'express'

import Error from '@shared/Error'

function auth(request: Request, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization

    if (!authorization) {
        throw new Error('Authorization token missing', 401)
    }

    const password = process.env.REST_PASSWORD || 'strongpassword'
    if (authorization === password) {
        return next()
    }

    throw new Error('Bad password', 401)
}

export default auth