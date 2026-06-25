import { Controller, Post, Get, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service'
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {
    constructor(private readonly publicacionesService: PublicacionesService) {}

    @Post()
    create(@Body() dto: CreatePublicacionDto) {
        return this.publicacionesService.create(dto);
    }

    @Get()
    findAll() {
        return this.publicacionesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publicacionesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePublicacionDto) {
        return this.publicacionesService.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() dto: UpdatePublicacionDto) {
        return this.publicacionesService.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.publicacionesService.restore(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publicacionesService.remove(id);
    }
}
