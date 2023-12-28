import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import PrismaService from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from 'src/helper/helper.service';
import { AuthRepository } from './repository/auth.repository';
import { JwtStrategy } from './jwt.strategy';

const jwtSecret = process.env.JWT_SECRET;
@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService, JwtService, HelperService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
