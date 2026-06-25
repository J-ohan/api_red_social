import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { Body, Get, Post, Query, Param, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@ApiTags('Usuarios')
@Controller('usuarios')

export class UsuariosController {
    constructor(
        private readonly UsuariosService:
        UsuariosService

    ){}

    @Post()
    create(@Body()
    dto:CreateUserDto
){
    return this.UsuariosService.create(dto);
}

    @Get()
    findAll(
        @Query() 
        search: SearchUserDto
    ){
       
    return this.UsuariosService.findAll(search);
    }

    @Get(':id')
    findOne(
        @Param('id') id:string
    ){
        return this.UsuariosService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id:string,
        @Body() dto: UpdateUserDto
    ){
        return this.UsuariosService.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(
        @Param('id') id:string,
        @Body() dto: UpdateUserDto
    ){
        return this.UsuariosService.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(
        @Param('id') id:string
    ){
        return this.UsuariosService.restore(id);
    }

    @Delete(':id')
    remove(
        @Param('id') id:string
    ){
        return this.UsuariosService.remove(id);
    }
}