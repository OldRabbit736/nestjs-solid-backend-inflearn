import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommentBaseDto } from 'src/comments/dto/comment.base.dto';

export class CreateCommentDto extends PickType(CommentBaseDto, [
  'target_cat_id',
  'writer_cat_id',
  'content',
] as const) {
  @IsNumber()
  @IsNotEmpty()
  target_cat_id: number;

  @IsNumber()
  @IsNotEmpty()
  writer_cat_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
