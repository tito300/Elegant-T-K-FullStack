const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

passport.use(new googleStrategy({

    clientID: "596619890647-gchhu49i1ii3ob2c47udbrhmu1ftjlh4.apps.googleusercontent.com",
    clientSecret: "2Zx4GzqmKrGLUseCfei94rOz",
    callbackURL: "/aoth/redirect"

}, (accessToken, refreshToken, profile, done)=> {

    console.log(profile);
    User.findOne({googleID: profile.id})
        .then((user)=> {

            if (user){
                done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    googleID: profile.id
                }).then((newUser)=>{ 
                    console.log('created a new user: '+ profile.id + " " + profile.displayName);
                    done(null, newUser);
                });
            }
        })

    

   
    
}));

passport.serializeUser((user, done)=>{

    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id).then((user) => {
        done(null, user);
    });
})