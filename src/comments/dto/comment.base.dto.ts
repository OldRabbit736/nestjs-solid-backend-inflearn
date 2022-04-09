import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CommentBaseDto {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  writer_cat_id: number;

  @ApiProperty({
    description: '대상 고양이 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  target_cat_id: number;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @IsPositive()
  likeCount: number;
}
