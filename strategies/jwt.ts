import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../model/user';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //De donde va a sacar el token
    secretOrKey: 'julio'
}

export const jwtStrategy = passport.use(new Strategy(options, function(jwt_payload, done) {
    console.log('Aquiiiiiiiiiiiiii')
    
    User.find({gmail: jwt_payload.gmail}, function(err, user) {
        if (err) {
            console.log(err)
            return done(err, false);
        }
        if (user) {
            console.log(user)
            return done(null, user[0]);
        } else {
            console.log('NULLL')
            return done(null, false);
            // or you could create a new account
        }
    });
    // done(null, user);
}));