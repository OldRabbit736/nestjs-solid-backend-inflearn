import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/repository/cats.repository';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { CommentsRepository } from '../repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  getAllComments() {
    try {
      return this.commentsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message); // HttpExceptionFilter에 걸릴 수 있도록
    }
  }

  createComment(catid: string, comment: CreateCommentDto) {
    return 'hello';
  }

  plusLike(catid: string) {
    throw new Error('Method not implemented.');
  }
}
