import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mailer/mail.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password >= password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const safeObject = {};
    const safeArray = Object.entries(user).map((el) => {
      if (el[1] == 'password') return null;
      else return el;
    });

    safeArray.forEach((el) => (safeObject[el[0]] = el[1]));

    const payload = { ...safeObject, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
  async signup(user: SignupDto) {
    const resetPassToken = uuidv4();
    const confirmToken = uuidv4();

    await this.mailService.sendMail(user.email, confirmToken);
    const createdUser = await this.userRepository.save({
      ...user,
      resetPassToken,
      confirmToken: confirmToken,
    });

    return createdUser;
  }
  async verifyAccountToken(token: string, email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user.confirmToken != token) {
      throw new HttpException('token does not match', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update({ email }, { isVerified: true });
    throw new HttpException('ok', HttpStatus.OK);
  }
}
