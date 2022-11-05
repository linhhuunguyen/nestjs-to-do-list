import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2d from 'argon2';

import { LoginDto } from './dto/login.dto';

import { ERROR } from 'src/common/error-code.const';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existingUser = await this.userService.findUserByEmail(email);
    if (!existingUser) {
      throw new BadRequestException(ERROR.USER_NOT_FOUND.MESSAGE);
    }
    const isRightPassword = await argon2d.verify(
      existingUser.password,
      password,
    );
    if (!isRightPassword)
      throw new BadRequestException(ERROR.PASSWORD_INCORRECT.MESSAGE);
    const payload = {
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      role: existingUser.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
