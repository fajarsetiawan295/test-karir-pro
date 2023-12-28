import { RegisterDto } from './dto/register.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from './repository/auth.repository';
import { UpdateDto } from './dto/update.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repositoryServices: AuthRepository,
    private readonly jwtService: JwtService,
  ) { }


  async register(data: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    await this.repositoryServices.createUser(data, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await this.repositoryServices.findByemail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      return { access_token, user };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async updateFoto(id: number, path: string) {
    try {
      const DataUpdate = {
        photo: path
      }
      const user = await this.repositoryServices.updateUser(id, DataUpdate);
      return user
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async updateUsers(id: number, data: UpdateDto) {
    try {
      const user = await this.repositoryServices.updateUser(id, data);
      return user
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async updatePassword(id: number, data: UpdatePasswordDto) {
    try {
      const user = await this.repositoryServices.findById(id);
      if (user && bcrypt.compareSync(data.password_old, user.password)) {

        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const payload = { password: hashedPassword };
        const user = await this.repositoryServices.updateUser(id, payload);

        return { user };
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
