import { UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Cat } from './cat.entity';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {
  async findByIdAndUpdateImg(id: number, fileName: string) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new UnauthorizedException('접근할 수 없습니다.');
    }
    cat.imgUrl = `http://localhost:${process.env.APPLICATION_PORT}/media/${fileName}`;
    return await this.save(cat);
  }
}
