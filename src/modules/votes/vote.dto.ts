import { IsNumber, IsString, IsEnum } from 'class-validator';

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

export class CreateVoteDto {
  @IsNumber()
  pollId!: number;

  @IsNumber()
  optionId!: number;

  @IsString()
  state!: string;
}

export class VoteResponseDto {
  id!: number;
  userId!: number;
  pollId!: number;
  optionId!: number;
  state!: string;
  createdAt!: Date;
}

export class VoteStatsDto {
  optionId!: number;
  optionText!: string;
  voteCount!: number;
  percentage!: number;
}

export class VoteResultsDto {
  pollId!: number;
  totalVotes!: number;
  stats!: VoteStatsDto[];
}

export class VoteResultsByStateDto extends VoteResultsDto {
  state!: string;
}