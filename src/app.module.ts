import { Module } from '@nestjs/common';
import { dateGeneratorProvider } from './common/date-generator.provider';
import { FilmesModule } from './filmes/filmes.module';


@Module({
  imports: [FilmesModule],
  providers: [dateGeneratorProvider],
})
export class AppModule {}