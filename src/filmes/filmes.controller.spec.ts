import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IdGeneratorService } from '../common/id-generator.service';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';

describe('FilmesController', () => {
  let controller: FilmesController;

  const idGeneratorMock = {
    gerar: jest.fn(),
  };

  const filmeValido = {
    titulo: 'Cidade de Deus',
    ano: 2002,
    genero: 'Drama',
    diretor: 'Fernando Meirelles',
    nota: 9.2,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    idGeneratorMock.gerar.mockReturnValue(1);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmesController],
      providers: [
        FilmesService,
        { provide: IdGeneratorService, useValue: idGeneratorMock },
      ],
    }).compile();

    controller = module.get<FilmesController>(FilmesController);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('POST /filmes deve cadastrar e devolver o filme com id', () => {
    const filme = controller.create(filmeValido);

    expect(filme.id).toBe(1);
    expect(filme.titulo).toBe('Cidade de Deus');
  });

  it('GET /filmes deve listar os filmes cadastrados', () => {
    controller.create(filmeValido);

    expect(controller.findAll()).toHaveLength(1);
  });

  it('GET /filmes/:id deve devolver o filme pelo id', () => {
    const criado = controller.create(filmeValido);

    expect(controller.findOne(criado.id).titulo).toBe('Cidade de Deus');
  });

  it('GET /filmes/:id deve lançar NotFoundException para id inexistente', () => {
    expect(() => controller.findOne(999)).toThrow(NotFoundException);
  });

  it('GET /filmes?notaMinima= deve filtrar pela nota informada', () => {
    idGeneratorMock.gerar.mockReturnValueOnce(1).mockReturnValueOnce(2);
    controller.create(filmeValido);
    controller.create({ ...filmeValido, titulo: 'Árido Movie', nota: 6.5 });

    const filtrados = controller.findAll(9);

    expect(filtrados).toHaveLength(1);
    expect(filtrados[0].titulo).toBe('Cidade de Deus');
  });

  it('PATCH /filmes/:id deve atualizar parcialmente', () => {
    const criado = controller.create(filmeValido);

    const atualizado = controller.update(criado.id, { nota: 8 });

    expect(atualizado.nota).toBe(8);
    expect(atualizado.titulo).toBe('Cidade de Deus');
  });

  it('DELETE /filmes/:id deve remover o filme', () => {
    const criado = controller.create(filmeValido);

    controller.remove(criado.id);

    expect(controller.findAll()).toHaveLength(0);
  });

  it('DELETE /filmes/:id deve lançar NotFoundException para id inexistente', () => {
    expect(() => controller.remove(999)).toThrow(NotFoundException);
  });
});