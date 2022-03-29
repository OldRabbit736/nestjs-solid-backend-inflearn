import { ReadonlyCatDto } from 'src/dto/readonly.cat.dto';
import { Comment } from '../entity/comment.entity';

export class ReadonlyCommentDto {
  private constructor(
    public id: number,
    public writer_cat: ReadonlyCatDto,
    public target_cat: ReadonlyCatDto,
    public content: string,
    public likeCount: number,
  ) {}

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
