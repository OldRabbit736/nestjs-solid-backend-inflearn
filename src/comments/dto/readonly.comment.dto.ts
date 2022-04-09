import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from 'src/comments/entity/comment.entity';
import { ReadonlyCatDto } from '../../cats/dto/readonly.cat.dto';
import { CommentBaseDto } from './comment.base.dto';

export class ReadonlyCommentDto extends PickType(CommentBaseDto, [
  'content',
  'likeCount',
] as const) {
  @ApiProperty({
    description: 'comment id',
  })
  id: number;

  @ApiProperty({
    description: '작성한 고양이 정보',
  })
  writer_cat: ReadonlyCatDto;

  @ApiProperty({
    description: '대상 고양이 정보',
  })
  target_cat: ReadonlyCatDto;

  content: string;

  likeCount: number;

  constructor(
    id: number,
    writer_cat: ReadonlyCatDto,
    target_cat: ReadonlyCatDto,
    content: string,
    likeCount: number,
  ) {
    super();
    this.id = id;
    this.writer_cat = writer_cat;
    this.target_cat = target_cat;
    this.content = content;
    this.likeCount = likeCount;
  }

  static create(comment: Comment) {
    const { id, target_cat, writer_cat, content, likeCount } = comment;
    const writerReadonlyCatDto = ReadonlyCatDto.create(writer_cat);
    const targetReadonlyCatDto = ReadonlyCatDto.create(target_cat);

    return new ReadonlyCommentDto(
      id,
      writerReadonlyCatDto,
      targetReadonlyCatDto,
      content,
      likeCount,
    );
  }
}
