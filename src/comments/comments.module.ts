import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from 'src/cats/cats.module';
import { CommentsController } from './controller/comments.controller';
import { CommentsRepository } from './repository/comments.repository';
import { CommentsService } from './service/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository]), CatsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
