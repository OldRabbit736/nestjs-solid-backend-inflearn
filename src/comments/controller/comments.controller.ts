import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from '../dto/create.comment.dto';
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

  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @Post(':catid')
  createComment(
    @Param('catid', ParseIntPipe) catid: number,
    @Body() body: CreateCommentDto, //TODO: 왜 AuthGuard를 이용해 요청자의 정보를 얻는 방법을 사용하지 않고 writer의 정보를 Dto로 받는 것으로 했을까...?
  ) {
    return this.commentsService.createComment(catid, body);
  }

  @ApiOperation({
    summary: '좋아요 수 올리기',
  })
  @Post(':catid/likes')
  plusLike(@Param('catid') catid: string) {
    return this.commentsService.plusLike(catid);
  }
}
