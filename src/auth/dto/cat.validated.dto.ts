import { OmitType } from '@nestjs/swagger';
import { CatBaseDto } from 'src/dto/cat.base.dto';

export class CatValidatedDto extends OmitType(CatBaseDto, [
  'password',
] as const) {}
