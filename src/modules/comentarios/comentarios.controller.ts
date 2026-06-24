import { Controller, Post, Get, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
    constructor(private readonly comentariosService: ComentariosService) {}

    @Post()
    create(@Body() dto: CreateComentarioDto) {
    return this.comentariosService.create(dto);
}

    @Get()
    findAll() {
    return this.comentariosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string,
    @Body() dto: UpdateComentarioDto) {
        return this.comentariosService.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() dto: UpdateComentarioDto) {
    return this.comentariosService.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.comentariosService.restore(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.comentariosService.remove(id);
    }
}
