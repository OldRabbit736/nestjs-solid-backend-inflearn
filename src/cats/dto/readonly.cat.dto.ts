import { PickType } from '@nestjs/swagger';
import { Cat } from '../entity/cat.entity';
import { CatBaseDto } from './cat.base.dto';

export class ReadonlyCatDto extends PickType(CatBaseDto, [
  'id',
  'email',
  'name',
  'imgUrl',
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
    return new ReadonlyCatDto(cat.id, cat.email, cat.name, cat.imgUrl);
  }
}
