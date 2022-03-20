import { PickType } from '@nestjs/swagger';
import { Cat } from '../cat.entity';
import { CatBaseDto } from '../../dto/cat.base.dto';

export class CreateCatResponseDto extends PickType(CatBaseDto, [
  'id',
  'email',
  'name',
] as const) {
  private constructor(
    public id: number,
    public email: string,
    public name: string,
    public imgUrl: string,
  ) {
    super();
  }

  static create(cat: Cat) {
    return new CreateCatResponseDto(cat.id, cat.email, cat.name, cat.imgUrl);
  }
}
