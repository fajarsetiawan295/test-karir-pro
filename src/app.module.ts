import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import PrismaService from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from './helper/helper.service';
import { AuthRepository } from './auth/repository/auth.repository';
import { JwtStrategy } from './auth/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';


const jwtSecret = process.env.JWT_SECRET;
@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService, HelperService, AuthRepository, JwtStrategy],
})
export class AppModule {}
