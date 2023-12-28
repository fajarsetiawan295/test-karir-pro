import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Request,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { HelperService } from 'src/helper/helper.service';
import { RegisterDto } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateDto } from './dto/update.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly respone: HelperService,

  ) { }



  @Post('register')
  async register(@Body(new ValidationPipe({ transform: true })) body: RegisterDto) {
    try {
      await this.authService.register(body);
      return this.respone.createResponseSuccess('Registrasi Berhasil', null, null);
    } catch (error) {
      return this.respone.createResponseError('Registrasi Berhasil', error.message);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.login(body.email, body.password);

      const data = {
        token: user.access_token,
        user: user.user,
      }
      return this.respone.createResponseSuccess('Login Berhasil', null, data);
    } catch (error) {
      return this.respone.createResponseError('Login failed', error.message);
    }
  }

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const originalname = file.originalname;
          const fileExtension = originalname.split('.').pop(); // Get the extension
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
        }
      }),
    }),
  )
  async uploadImage(@Request() req, @UploadedFile() image: Express.Multer.File) {

    if (!image) {
      return this.respone.createResponseError('upload filed', null);
    }

    const update = await this.authService.updateFoto(req.user.id, image.path);

    return this.respone.createResponseSuccess('Update Foto Berhasil', null, update);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProtectedRoute(@Request() req) {
    return this.respone.createResponseSuccess('Berhasil', null, req.user);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateUsers(@Request() req, @Body(new ValidationPipe({ transform: true })) body: UpdateDto) {
    try {
      const update = await this.authService.updateUsers(req.user.id, body);
      return this.respone.createResponseSuccess('Update Foto Berhasil', null, update);
    } catch (error) {
      return this.respone.createResponseError('upload filed', error);
    }
  }


  @Post('update_password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Request() req, @Body(new ValidationPipe({ transform: true })) body: UpdatePasswordDto) {
    try {
      const update = await this.authService.updatePassword(req.user.id, body);
      return this.respone.createResponseSuccess('Update Foto Berhasil', null, update);
    } catch (error) {
      return this.respone.createResponseError('upload filed', error);
    }
  }
}
