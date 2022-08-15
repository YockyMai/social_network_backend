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

  @Column({ nullable: true })
  avatar: string;

  @Column()
  @Length(1, 50)
  firstName: string;

  @Column()
  @Length(1, 50)
  lastName: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  gender: string;

  @Column({})
  @Length(6, 255)
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true })
  resetPassToken: string;

  @Column({ nullable: true })
  confirmToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
