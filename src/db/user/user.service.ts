import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(): any {
    return 'create user route';
  }
  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }
}
