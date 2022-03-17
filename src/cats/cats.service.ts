import { Injectable } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  signUp(body: CatRequestDto) {}
}
