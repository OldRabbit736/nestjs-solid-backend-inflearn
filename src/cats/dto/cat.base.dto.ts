import { ApiProperty } from '@nestjs/swagger';

export class CatBaseDto {
  @ApiProperty({
    example: 'cat-hero@gmail.com',
    description: '이메일 주소',
  })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '12345',
  })
  password: string;

  @ApiProperty({
    example: '나비',
    description: '이름',
  })
  name: string;

  @ApiProperty({
    description: '아이디',
    example: '12345',
  })
  id: number;

  @ApiProperty({
    description: '이미지 url',
    example: 'https://img.url',
  })
  imgUrl: string;
}
