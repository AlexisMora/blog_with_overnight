import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

import * as passport from 'passport';
require("../config/passport");

@Controller('auth')
export class AuthController {

    @Post('login')
    private getUsers(req: Request, res: Response) {
        passport.authenticate('local', {session: false}, (err,user, info)=>{

            console.log(err,user,info);
            
            if(err || !user){
                return res.status(401).json({
                    message: 'Login failed',
                    user: user
                });
            }
            req.login(user, {session: false}, (err)=>{
                
                const token = this.generateToken(user.email)
                return res.json({
                    token:token,
                    email:user.email
                })
            })
        })(req,res)
    }
    @Get('google')
    @Middleware(passport.authenticate('google',{scope:'email'}))
    private googleLogin(req: Request, res: Response){
        console.log("entra en googleLogin")
    };

    @Get('google/callback')
    @Middleware(passport.authenticate('google',{session:false}))
    private googleLoginCb(req: Request, res: Response,next:any){
        console.log("entra en el callback")
        let maybeToken=this.generateToken(req.user)
        console.log("este el token generado por nosotros: ",maybeToken)

        res.redirect("http://localhost:8081/#/Admin?token="+maybeToken+"&userEmail="+req.user)
    }

    private generateToken(email: any) {
        let tokenData = {
            sub: email
        }
        let token = jwt.sign(tokenData, '1cf697f4c15c9b5b6baff828ae24930b81947fab664f928225684e5e75f45e26', {
            expiresIn: 60 * 60 * 24//Expires in 24h
        })
        return token;
    }
}