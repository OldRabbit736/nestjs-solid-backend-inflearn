import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }), // session cookie 사용 여부?
    // JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1y' } }),
    CatsModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}