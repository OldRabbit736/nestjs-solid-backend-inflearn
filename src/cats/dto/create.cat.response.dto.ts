import { PickType } from '@nestjs/swagger';
import { Cat } from '../cat.entity';
import { CatBaseDto } from '../../dto/cat.base.dto';

export class CreateCatResponseDto extends PickType(CatBaseDto, [
  'id',
  'email',
  'name',
] as const) {
  private constructor(id: number, email: string, name: string) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static create(cat: Cat) {
    return new CreateCatResponseDto(cat.id, cat.email, cat.name);
  }
}
