import { PickType } from '@nestjs/swagger';
import { CatBaseDto } from './cat.base.dto';

export class CreateCatRequestDto extends PickType(CatBaseDto, [
  'email',
  'password',
  'name',
] as const) {}
