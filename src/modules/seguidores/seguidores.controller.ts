import { Controller, Post, Get, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidores.dto';
import { UpdateSeguidorDto } from './dto/update-seguidores.dto';

@Controller('seguidores')
export class SeguidoresController {
    constructor(private readonly seguidoresService: SeguidoresService) {}

    @Post()
    create(@Body() dto: CreateSeguidorDto) {
    return this.seguidoresService.create(dto);
}

    @Get()
    findAll() {
    return this.seguidoresService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.seguidoresService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string,
    @Body() dto: UpdateSeguidorDto) {
        return this.seguidoresService.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() dto: UpdateSeguidorDto) {
    return this.seguidoresService.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.seguidoresService.restore(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.seguidoresService.remove(id);
    }
}