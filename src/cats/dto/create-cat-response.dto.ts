import { ApiProperty } from '@nestjs/swagger';
import { Cat } from '../cat.entity';

export class CreateCatResponseDto {
  private constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  @ApiProperty({
    description: '아이디',
    example: '12345',
  })
  id: number;

  @ApiProperty({
    description: '이메일',
    example: 'cat-hero@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '이름',
    example: '나비',
  })
  name: string;

  static create(cat: Cat) {
    return new CreateCatResponseDto(cat.id, cat.email, cat.name);
  }
}
