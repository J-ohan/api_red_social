import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeguidorDto {
    @ApiProperty({
        description: 'ID del usuario que va a ser seguido',
    })
    @IsMongoId()
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        description: 'ID del usuario que sigue',
    })
    @IsMongoId()
    @IsNotEmpty()
    seguidor_id!: string;
    }