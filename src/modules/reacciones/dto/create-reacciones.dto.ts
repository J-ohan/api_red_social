import { IsNotEmpty, IsString, IsIn, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

    export class CreateReaccionDto {
    @ApiProperty({
        description: 'ID de la publicación a la que se reacciona',
    })
    @IsMongoId()
    @IsNotEmpty()
    publicacion_id!: string;

    @ApiProperty({
        description: 'ID del usuario que reacciona',
    })
    @IsMongoId()
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        description: 'Tipo de reacción',
        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
        default: 'like',
    })
    @IsString()
    @IsOptional()
    @IsIn(['like', 'love', 'haha', 'wow', 'sad', 'angry'])
    tipo?: string;
    }