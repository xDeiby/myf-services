import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import envConfig from '../../../config/env.conf';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envConfig.app.secret,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  done(null, payload);
});

export default jwtStrategy;
