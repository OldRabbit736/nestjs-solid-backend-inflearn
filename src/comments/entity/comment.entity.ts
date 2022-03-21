import { Cat } from 'src/cats/entity/cat.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id: number;

  @ManyToOne(() => Cat, { eager: false, nullable: false })
  writer_cat: Cat;

  @ManyToOne(() => Cat, { eager: false, nullable: false })
  target_cat: Cat;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 0 })
  likeCount: number;
}
