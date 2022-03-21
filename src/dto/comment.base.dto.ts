import { Cat } from 'src/cats/entity/cat.entity';
import { Comment } from 'src/comments/entity/comment.entity';

export class CommentBaseDto
  implements Pick<Comment, 'id' | 'writer_cat' | 'content'>
{
  writer_cat: Cat;
  id: number;
  content: string;
}
