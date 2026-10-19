import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAvaliacaoDto {
  @IsInt()
  @Min(1)
  filmeId: number;

  @IsString()
  @IsNotEmpty({ message: 'O autor é obrigatório' })
  @MaxLength(80)
  autor: string;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(10)
  nota: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comentario?: string;
}