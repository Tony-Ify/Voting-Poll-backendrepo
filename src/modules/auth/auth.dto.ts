import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

enum State {
  ABIA = 'ABIA',
  ADAMAWA = 'ADAMAWA',
  AKWA_IBOM = 'AKWA IBOM',
  ANAMBRA = 'ANAMBRA',
  BAUCHI = 'BAUCHI',
  BAYELSA = 'BAYELSA',
  BENUE = 'BENUE',
  BORNO = 'BORNO',
  CROSS_RIVER = 'CROSS RIVER',
  DELTA = 'DELTA',
  EBONYI = 'EBONYI',
  EDO = 'EDO',
  EKITI = 'EKITI',
  ENUGU = 'ENUGU',
  GOMBE = 'GOMBE',
  IMO = 'IMO',
  JIGAWA = 'JIGAWA',
  KADUNA = 'KADUNA',
  KANO = 'KANO',
  KATSINA = 'KATSINA',
  KEBBI = 'KEBBI',
  KOGI = 'KOGI',
  KWARA = 'KWARA',
  LAGOS = 'LAGOS',
  NASARAWA = 'NASARAWA',
  NIGER = 'NIGER',
  Ogun = 'OGUN',
  ONDO = 'ONDO',
  OSUN = 'OSUN',
  OYO = 'OYO',
  PLATEAU = 'PLATEAU',
  RIVERS = 'RIVERS',
  SOKOTO = 'SOKOTO',
  TARABA = 'TARABA',
  YOBE = 'YOBE',
  ZAMFARA = 'ZAMFARA',
  
}

export class SignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @IsEnum(State)
  state!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class AuthResponseDto {
  id!: number;
  name!: string;
  email!: string;
  state!: string;
  role!: string;
  accessToken!: string;
  expiresIn!: string;
}