import { Injectable } from '@nestjs/common';

@Injectable()
export class IdGeneratorService {
  private contador = 0;

  gerar(): number {
    this.contador += 1;
    return this.contador;
  }
}