import { Controller,Post, Put, Param, Patch, Body, Get, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly services:
        RolesService,
    ){}

    /**
     * crear rol 
     */

    @Post()
    create(
        @Body()
        dto: CreateRoleDto,
    ){
        return this.services.create(
            dto
        )
    }

    @Get()
    finAll(){
        return this.services.findAll()
    }

    @Get('inactivos')
    findInactive(){
        return this.services.findInactive();
    }

    /**
     * Buscar un rol por id
     */

    @Get(':id')
    findOne(
        @Param('id')
        id: string,

    ){
        return this.services.findOne(
            id,
        );
    }
    
    @Put(':id')
    update(
        @Param('id')
        id:string,
        @Body()
        dto: UpdateRoleDto,
    ){
        return this.services.update(id, dto);
    }

    /**
     * Actualizacion parcial
     */

    @Patch(':id')
    partialUpdate(
        @Param('id')
        id:string,

        @Body()
        dto: UpdateRoleDto,
    ){
        return this.services.partialUpdate(id, dto);
    }

    /**
     * Restaurar rol elimnado 
     */

    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id:string,
    ){
        return this.services.restore(id);
    }

    /**
     * Eliminacion logica
     */

    @Delete(':id')
    remove(
        @Param('id')
        id:string,
    ){
        return this.services.remove(id);
    }
}