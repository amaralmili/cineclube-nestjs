import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new BadRequestException(
        `O campo ${metadata.data} não pode ser vazio`,
      );
    }

    return value.trim();
  }
}