import { Cat } from 'src/cats/entity/cat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id: number;

  @JoinColumn({ name: 'writer_cat_id' })
  @ManyToOne(() => Cat, { eager: false, nullable: false })
  writer_cat: Cat;

  @JoinColumn({ name: 'target_cat_id' })
  @ManyToOne(() => Cat, { eager: false, nullable: false })
  target_cat: Cat;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 0 })
  likeCount: number;
}
