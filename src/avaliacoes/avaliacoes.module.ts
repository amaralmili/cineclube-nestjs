import { Module } from '@nestjs/common';
import { FilmesModule } from '../filmes/filmes.module';
import { AvaliacoesController } from './avaliacoes.controller';
import { AvaliacoesService } from './avaliacoes.service';

@Module({
  imports: [FilmesModule],
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService],
})
export class AvaliacoesModule {}