import { Cat } from '../cat.entity';

export class CreateCatResponseDto {
  private constructor(
    public id: number,
    public email: string,
    public name: string,
  ) {}

  static create(cat: Cat) {
    return new CreateCatResponseDto(cat.id, cat.email, cat.name);
  }
}
