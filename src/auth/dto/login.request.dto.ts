import { PickType } from '@nestjs/swagger';
import { CatBaseDto } from 'src/cats/dto/cat.base.dto';

export class LoginRequestDto extends PickType(CatBaseDto, [
  'email',
  'password',
] as const) {}
