import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from './repository/cats.repository';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './service/cats.service';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([CatsRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService], // do not include CatsRepository here!! It's already been provided by TypeOrmMudle.forFeature
  exports: [TypeOrmModule], // for exporting CatsRepository
})
export class CatsModule {}
