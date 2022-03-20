import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cat.entity';
import { CatBaseDto } from 'src/dto/cat.base.dto';

export class CatValidatedDto extends PickType(CatBaseDto, [
  'email',
  'id',
  'imgUrl',
  'name',
] as const) {
  private constructor(
    public email: string,
    public id: number,
    public imgUrl: string,
    public name: string,
  ) {
    super();
  }

  static create(cat: Cat) {
    return new CatValidatedDto(cat.email, cat.id, cat.imgUrl, cat.name);
  }
}
