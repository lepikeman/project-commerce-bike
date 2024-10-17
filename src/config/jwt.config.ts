import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
<<<<<<< HEAD
    secret: process.env.JWT_SECRET || 'fallbacksecret',
=======
    secret: process.env.JWT_SECRET || 'fallbakcsecret',
>>>>>>> 3e0c7e6 (post CR)
    signOptions: {
      expiresIn: process.env.JWT_EXPIRE_IN,
    },
  }),
);
