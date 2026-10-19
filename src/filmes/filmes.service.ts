import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INICIO_DA_APLICACAO, NOTA_MAXIMA } from '../common/constants';
import { IdGeneratorService } from '../common/id-generator.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from './entities/filme.entity';

@Injectable()
export class FilmesService {
  private filmes: Filme[] = [];

  constructor(
    private readonly idGenerator: IdGeneratorService,
    @Inject(NOTA_MAXIMA) private readonly notaMaxima: number,
    @Inject(INICIO_DA_APLICACAO) private readonly inicioDaAplicacao: Date,
  ) {}

validarNota(nota: number): boolean {
  return nota >= 0 && nota <= this.notaMaxima;
}
  getInicioDaAplicacao(): Date {
    return this.inicioDaAplicacao;
  }

  create(dto: CreateFilmeDto): Filme {
    const filme: Filme = {
      id: this.idGenerator.gerar(),
      titulo: dto.titulo,
      ano: dto.ano,
      genero: dto.genero,
      diretor: dto.diretor,
      nota: dto.nota,
    };

    this.filmes.push(filme);
    return filme;
  }

  findAll(): Filme[] {
    return this.filmes;
  }

  findOne(id: number): Filme {
    return this.buscarPorId(id);
  }

  findByNotaMinima(notaMinima: number): Filme[] {
    return this.filmes.filter((filme) => filme.nota >= notaMinima);
  }

  update(id: number, dto: UpdateFilmeDto): Filme {
    const filme = this.buscarPorId(id);

    if (dto.titulo !== undefined) {
      filme.titulo = dto.titulo;
    }
    if (dto.ano !== undefined) {
      filme.ano = dto.ano;
    }
    if (dto.genero !== undefined) {
      filme.genero = dto.genero;
    }
    if (dto.diretor !== undefined) {
      filme.diretor = dto.diretor;
    }
    if (dto.nota !== undefined) {
      filme.nota = dto.nota;
    }

    return filme;
  }

  remove(id: number): void {
    const indice = this.filmes.findIndex((filme) => filme.id === id);

    if (indice === -1) {
      throw new NotFoundException(`filme ${id} não encontrado`);
    }

    this.filmes.splice(indice, 1);
  }

  private buscarPorId(id: number): Filme {
    const filme = this.filmes.find((item) => item.id === id);

    if (!filme) {
      throw new NotFoundException(`filme ${id} não encontrado`);
    }

    return filme;
  }
}