import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CatsRepository } from 'src/cats/repository/cats.repository';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { ReadonlyCommentDto } from 'src/comments/dto/readonly.comment.dto';
import { CommentsRepository } from '../repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsRepository.find({
        relations: ['writer_cat', 'target_cat'], // https://seungtaek-overflow.tistory.com/9
      });
      return comments.map(ReadonlyCommentDto.create);
    } catch (error) {
      throw new InternalServerErrorException(error.message); // HttpExceptionFilter에 걸릴 수 있도록
    }
  }

  // transaction으로 해야하나....???
  async createComment(commentData: CreateCommentDto) {
    try {
      const { target_cat_id, writer_cat_id, content } = commentData;

      const targetCat = await this.catsRepository.findOne({
        id: target_cat_id,
      });
      const author = await this.catsRepository.findOne({
        id: writer_cat_id,
      });

      if (!targetCat || !author) {
        throw new BadRequestException('잘못된 요청입니다.');
      }

      const newComment = this.commentsRepository.create({
        writer_cat: author,
        target_cat: targetCat,
        content,
      });

      const comment = await this.commentsRepository.save(newComment);
      return ReadonlyCommentDto.create(comment);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message); // HttpExceptionFilter에 걸릴 수 있도록
      }
    }
  }

  // TODO: 이곳 작성하기!!!
  async plusLike(commentId: number) {
    try {
      const comment = await this.commentsRepository.findOne(
        {
          id: commentId,
        },
        { relations: ['writer_cat', 'target_cat'] },
      );

      if (!comment) {
        throw new BadRequestException('잘못된 요청입니다.');
      }

      comment.likeCount += 1;

      const savedComment = await this.commentsRepository.save(comment);
      return ReadonlyCommentDto.create(savedComment);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message); // HttpExceptionFilter에 걸릴 수 있도록
      }
    }
  }
}
