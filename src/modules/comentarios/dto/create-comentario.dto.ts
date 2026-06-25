import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
  @ApiProperty({
    description: 'Texto del comentario',
  })
  @IsString()
  @IsNotEmpty()
  texto!: string;

  @ApiProperty({
    description: 'ID de la publicación asociada',
  })
  @IsString()
  @IsNotEmpty()
  publicacion_id!: string;

  @ApiProperty({
    description: 'ID del usuario que realiza el comentario',
  })
  @IsString()
  @IsNotEmpty()
  usuario_id!: string;
}
