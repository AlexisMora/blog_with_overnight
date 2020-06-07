import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
 
@Controller('api/users')
export class LoginController {
 
    @Get('')
    private get(req: Request, res: Response) {
        return res.status(OK).json({
            message: 'get_called',
        });
    }
}