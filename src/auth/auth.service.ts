import { Injectable } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
  }
}
