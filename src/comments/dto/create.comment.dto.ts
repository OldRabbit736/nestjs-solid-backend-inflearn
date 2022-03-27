import { PickType } from '@nestjs/swagger';
import { CommentBaseDto } from 'src/dto/comment.base.dto';

export class CreateCommentDto extends PickType(CommentBaseDto, [
  'writer_cat_id',
  'content',
] as const) {}
