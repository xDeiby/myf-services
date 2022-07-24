import passport from 'passport';

import { jwtStrategy, localStategy } from './strategies';

passport.use(localStategy);
passport.use(jwtStrategy);
