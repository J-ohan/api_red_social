import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicacionDto {
    @ApiProperty({ description: 'Título de la publicación' })
    @IsString()
    @IsNotEmpty()
    titulo!: string;

    @ApiProperty({ description: 'Contenido de la publicación' })
    @IsString()
    @IsNotEmpty()
    contenido!: string;

    @ApiProperty({ description: 'ID del usuario que crea la publicación' })
    @IsString()
    @IsNotEmpty()
    usuario_id!: string;
    }
