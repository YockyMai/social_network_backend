import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
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
}
