export const dateGeneratorProvider = {
  provide: 'INICIO_DA_APLICACAO',
  useFactory: (): Date => new Date(),
};