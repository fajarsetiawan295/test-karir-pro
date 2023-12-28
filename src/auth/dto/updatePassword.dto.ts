import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @IsString({ message: 'Password harus berupa string' })
  @MinLength(6, { message: 'Password harus memiliki setidaknya 6 karakter' })
  password: string;


  @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
  @IsString({ message: 'Password lama harus berupa string' })
  @MinLength(6, { message: 'Password lama harus memiliki setidaknya 6 karakter' })
  password_old: string;
}