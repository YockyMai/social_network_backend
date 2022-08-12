import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 50)
  firstName: string;

  @Column()
  @Length(1, 50)
  lastName: string;

  @Column({})
  @Length(6, 255)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
