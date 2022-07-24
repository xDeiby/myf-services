import { Strategy } from 'passport-local';

import { AuthService } from '../../services';

const localStategy = new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await AuthService.user(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStategy;
