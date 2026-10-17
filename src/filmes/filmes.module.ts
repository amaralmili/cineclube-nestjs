import { Module } from '@nestjs/common';
import { IdGeneratorService } from '../common/id-generator.service';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';

@Module({
  controllers: [FilmesController],
  providers: [FilmesService, IdGeneratorService],
})
export class FilmesModule {}