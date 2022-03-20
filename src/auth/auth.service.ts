import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getCustomRepository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CatsRepository)
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // const cat = await getCustomRepository(CatsRepository).findOne({ email });
    const cat = await this.catsRepository.findOne({ email });

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.');
    }

    const isPasswordValidated = await bcrypt.compare(password, cat.password);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.');
    }

    const payload = { email, sub: cat.id }; // sub은 registered claim 중의 하나로, subject(토큰 제목)의 줄임말.

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
