import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/repository/cats.repository';
import { ReadonlyCatDto } from 'src/dto/readonly.cat.dto';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findOne(payload.sub);

    if (cat) {
      return ReadonlyCatDto.create(cat); // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
