import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { jwtSecretKey } from '../const';
import { CatValidatedDto } from '../dto/cat.validated.dto';
import { Payload } from './jwt.payload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(CatsRepository)
    private readonly catsRepository: CatsRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    console.log({ payload });
    const cat = await this.catsRepository.findOne(payload.sub);

    if (cat) {
      return cat as CatValidatedDto; // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
