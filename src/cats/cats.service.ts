import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { CreateCatRequestDto } from './dto/create-cat-request.dto';
import * as bcrypt from 'bcrypt';
import { CreateCatResponseDto } from './dto/create-cat-response.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatRepository)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async signUp(body: CreateCatRequestDto): Promise<CreateCatResponseDto> {
    const { email, name, password } = body;

    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.startTransaction('REPEATABLE READ');

    const catRepository =
      queryRunner.manager.getCustomRepository(CatRepository);

    try {
      const found = await catRepository.findOne({
        email,
      });

      if (found) {
        throw new ConflictException('해당하는 고양이는 이미 존재합니다.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const cat = catRepository.create({
        email,
        name,
        password: hashedPassword,
      });

      const result = await catRepository.save(cat);

      await queryRunner.commitTransaction();
      return CreateCatResponseDto.create(result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
