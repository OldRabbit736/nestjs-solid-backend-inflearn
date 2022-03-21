import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from '../service/comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }
}
