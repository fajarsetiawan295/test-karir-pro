import { RegisterDto } from '../dto/register.dto';
import { Injectable } from '@nestjs/common';
import PrismaService from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }


  async findByemail(email: string) {
    return this.prismaService.getPrisma().users.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prismaService.getPrisma().users.findUnique({ where: { id } });
  }

  async createUser(data: RegisterDto, password: string) {
    try {
      return await this.prismaService.getPrisma().users.create({
        data: {
          email: data.email,
          phone: data.phone,
          name: data.name,
          password: password,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
         throw new Error('Email sudah di gunakan');
      }
      throw error;
    }
  }

  async updateUser(userId: number, data: any) {
    try {
      return await this.prismaService.getPrisma().users.update({
        where: { id: userId },
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
