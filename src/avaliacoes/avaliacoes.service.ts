import { Injectable, NotFoundException } from '@nestjs/common';
import { IdGeneratorService } from '../common/id-generator.service';
import { FilmesService } from '../filmes/filmes.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { Avaliacao } from './entities/avaliacao.entity';

@Injectable()
export class AvaliacoesService {
  private avaliacoes: Avaliacao[] = [];

  constructor(
    private readonly idGenerator: IdGeneratorService,
    private readonly filmesService: FilmesService,
  ) {}

  create(dto: CreateAvaliacaoDto): Avaliacao {
    this.filmesService.findOne(dto.filmeId);

    const avaliacao: Avaliacao = {
      id: this.idGenerator.gerar(),
      filmeId: dto.filmeId,
      autor: dto.autor,
      nota: dto.nota,
      comentario: dto.comentario ?? '',
      criadaEm: new Date(),
    };

    this.avaliacoes.push(avaliacao);
    this.recalcularNotaDoFilme(dto.filmeId);

    return avaliacao;
  }

  findByFilme(filmeId: number): Avaliacao[] {
    this.filmesService.findOne(filmeId);
    return this.avaliacoes.filter((item) => item.filmeId === filmeId);
  }

  mediaDoFilme(filmeId: number): number {
    const notas = this.avaliacoes
      .filter((item) => item.filmeId === filmeId)
      .map((item) => item.nota);

    if (notas.length === 0) {
      return 0;
    }

    const soma = notas.reduce((total, nota) => total + nota, 0);
    return Number((soma / notas.length).toFixed(1));
  }

  private recalcularNotaDoFilme(filmeId: number): void {
    const media = this.mediaDoFilme(filmeId);

    if (media > 0) {
      this.filmesService.update(filmeId, { nota: media });
    }
  }
}