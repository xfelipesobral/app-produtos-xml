import 'express-async-errors'
import { Request, Response, NextFunction } from 'express'

import AppError from '@shared/Error'

function error(err: Error, request: Request, response: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
}

export default error