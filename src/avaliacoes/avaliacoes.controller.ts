import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AvaliacoesService } from './avaliacoes.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';

@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateAvaliacaoDto) {
    return this.avaliacoesService.create(dto);
  }

  @Get('filme/:filmeId')
  findByFilme(@Param('filmeId', ParseIntPipe) filmeId: number) {
    return this.avaliacoesService.findByFilme(filmeId);
  }

  @Get('filme/:filmeId/media')
  media(@Param('filmeId', ParseIntPipe) filmeId: number) {
    return { filmeId, media: this.avaliacoesService.mediaDoFilme(filmeId) };
  }
}