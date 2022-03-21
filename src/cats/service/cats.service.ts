import { ConflictException, Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CatsRepository } from '../repository/cats.repository';
import { CreateCatRequestDto } from '../dto/create.cat.request.dto';
import * as bcrypt from 'bcrypt';
import { ReadonlyCatDto } from 'src/dto/readonly.cat.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatsRepository) {}

  async signUp(body: CreateCatRequestDto): Promise<ReadonlyCatDto> {
    const { email, name, password } = body;

    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.startTransaction('REPEATABLE READ');

    const catRepository =
      queryRunner.manager.getCustomRepository(CatsRepository);

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
      return ReadonlyCatDto.create(result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  uploadImg(cat: ReadonlyCatDto, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    return this.catRepository.findByIdAndUpdateImg(cat.id, fileName);
  }

  async getAllCat() {
    const allCat = await this.catRepository.find();
    // const
  }
}
