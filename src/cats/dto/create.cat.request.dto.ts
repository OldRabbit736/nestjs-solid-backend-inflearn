import { PickType } from '@nestjs/swagger';
import { CatBaseDto } from '../../dto/cat.base.dto';

export class CreateCatRequestDto extends PickType(CatBaseDto, [
  'email',
  'password',
  'name',
] as const) {}
