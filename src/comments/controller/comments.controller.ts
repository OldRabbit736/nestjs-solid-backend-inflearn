import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadonlyCommentDto } from 'src/dto/readonly.comment.dto';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { CommentsService } from '../service/comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadonlyCommentDto, // TODO: convert to Result<T>
    isArray: true,
  })
  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiResponse({
    status: 201,
    description: '성공',
    type: ReadonlyCommentDto,
  })
  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @Post()
  createComment(
    @Body() body: CreateCommentDto, //TODO: 왜 AuthGuard를 이용해 요청자의 정보를 얻는 방법을 사용하지 않고 writer의 정보를 Dto로 받는 것으로 했을까...?
  ) {
    return this.commentsService.createComment(body);
  }

  @ApiResponse({
    status: 201,
    description: '성공',
    type: ReadonlyCommentDto,
  })
  @ApiOperation({
    summary: '좋아요 수 올리기',
  })
  @Patch(':commentId/likes')
  plusLike(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.plusLike(commentId);
  }
}
