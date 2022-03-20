import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn({ name: 'cat_id' })
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
    name: 'img_url',
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  imgUrl: string;
}
