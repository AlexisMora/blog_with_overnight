import * as passport from "passport"
import * as passportLocal from "passport-local"
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = passportLocal.Strategy;

import {findUser} from '../dao/USerDao'

passport.serializeUser((user,done) => {
    done(null,user)
});

passport.deserializeUser((user,done) => {
    done(null,user)
});

passport.use(new LocalStrategy({
        usernameField: 'usuari',
        passwordField: 'contrasenya'
    },
    async function(email:any, password:any, done:any) {
        //console.log('Entra',email, password);
        /*
        1º cas
        done(err) --> hi ha hagut un error (err)
        2º cas
        done(null,false) --> no hi ha hagut error però no és vàlid l'usuari
        3º cas
        done(null,true o user...) --> usuari autenticat correctament
         */
        console.log('ENTRA A PASSPORT LOCAL');
        let resultat:any = await findUser(email)
        console.log("Resultat: ",resultat)
        if(email = resultat[0].email && password ==resultat[0].password){
            return done(null,{
                email:resultat[0].email
            })
        }else{
            return done("Error d'autenticacio")
        }
    }
));

passport.use(new GoogleStrategy({
    clientID:"456348531371-6b75so7kns8a7c9snrgdqm7db9ulipfj.apps.googleusercontent.com",
    clientSecret: "n9whSfs8QUyOlBLb-bINS_kB",
    callbackURL:"http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
},
async function(request:any, accessToken:any, refreshToken:any, profile:any, done:any) {
    let emailGoogle= profile.emails[0].value
    console.log(profile.emails[0].value)
    let resultat:any = await findUser(emailGoogle)
    if(emailGoogle = resultat[0].email){
        return done(null,profile.emails[0].value)
    }else{
        return done("Error d'autenticacio")
    }
  }
))