import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create.comment.dto';

@Injectable()
export class CommentsService {
  getAllComments() {
    return 'hello';
  }

  createComment(catid: string, comment: CreateCommentDto) {
    return 'hello';
  }

  plusLike(catid: string) {
    throw new Error('Method not implemented.');
  }
}
