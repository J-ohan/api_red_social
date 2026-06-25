import { Controller, Post, Get, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ReaccionesService } from './reacciones.service';
import { CreateReaccionDto } from './dto/create-reacciones.dto';
import { UpdateReaccionDto } from './dto/update-reacciones.dto';

@Controller('reacciones')
export class ReaccionesController {
    constructor(private readonly reaccionesService: ReaccionesService) {}

    @Post()
    create(@Body() dto: CreateReaccionDto) {
    return this.reaccionesService.create(dto);
}

    @Get()
    findAll() {
    return this.reaccionesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.reaccionesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string,
    @Body() dto: UpdateReaccionDto) {
        return this.reaccionesService.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() dto: UpdateReaccionDto) {
    return this.reaccionesService.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.reaccionesService.restore(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reaccionesService.remove(id);
    }
}