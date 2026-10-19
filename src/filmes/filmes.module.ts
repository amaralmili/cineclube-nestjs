import { Module } from '@nestjs/common';
import { IdGeneratorService } from '../common/id-generator.service';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  controllers: [FilmesController],
  providers: [FilmesService, IdGeneratorService],
  imports: [AuthModule]
})
export class FilmesModule {}