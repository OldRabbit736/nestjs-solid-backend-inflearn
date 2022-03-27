import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {}
