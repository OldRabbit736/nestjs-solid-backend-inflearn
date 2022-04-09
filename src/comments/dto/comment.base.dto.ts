import { ApiProperty } from '@nestjs/swagger';

export class CommentBaseDto {
  @ApiProperty({
    description: '작성한 고양이 id',
    // required: true   // required 기본 값이 true
  })
  writer_cat_id: number;

  @ApiProperty({
    description: '대상 고양이 id',
  })
  target_cat_id: number;

  @ApiProperty({
    description: '댓글 컨텐츠',
    example: '안녕~',
  })
  content: string;

  @ApiProperty({
    description: '좋아요 수',
    example: 3,
  })
  likeCount: number;
}
