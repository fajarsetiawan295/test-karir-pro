import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateDto {
  @IsEmail({}, { message: 'Alamat email tidak valid' })
  email: string;

  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsNotEmpty({ message: 'Nomor Handphone tidak boleh kosong' })
  @MinLength(11, { message: 'Nomor Handphone harus memiliki setidaknya 11 karakter' })
  phone: string;
}