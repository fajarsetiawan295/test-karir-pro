import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Alamat email tidak valid' })
  email: string;

  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsNotEmpty({ message: 'Nomor Handphone tidak boleh kosong' })
  @MinLength(11, { message: 'Nomor Handphone harus memiliki setidaknya 11 karakter' })
  phone: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @IsString({ message: 'Password harus berupa string' })
  @MinLength(6, { message: 'Password harus memiliki setidaknya 6 karakter' })
  password: string;
}