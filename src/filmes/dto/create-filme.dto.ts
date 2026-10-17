import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty({ message: 'o título é obrigatório' })
  @MaxLength(120)
  titulo: string;

  @IsInt()
  @Min(1888, { message: 'o ano deve ser maior ou igual a 1888' })
  @Max(2100)
  ano: number;

  @IsString()
  @IsNotEmpty({ message: 'o genero é obrigatório' })
  genero: string;

  @IsString()
  @IsNotEmpty({ message: 'o diretor é obrigatório' })
  diretor: string;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(10)
  nota: number;
}