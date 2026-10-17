import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FilmesService } from './filmes.service';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post()
  create(@Body() dto: CreateFilmeDto) {
    return this.filmesService.create(dto);
  }

  @Get()
  findAll(
    @Query('notaMinima', new ParseFloatPipe({ optional: true }))
    notaMinima?: number,
  ) {
    if (notaMinima === undefined) {
      return this.filmesService.findAll();
    }

    return this.filmesService.findByNotaMinima(notaMinima);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFilmeDto) {
    return this.filmesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmesService.remove(id);
  }
}