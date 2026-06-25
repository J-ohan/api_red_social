import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { BadRequestException, NotAcceptableException, NotFoundException } from "@nestjs/common/exceptions";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsuariosService {
    constructor(
        @InjectModel(User.name)
        private readonly userModule:
        Model<UserDocument>,
    ) {}

    /**
     * Metodo para la creacion de Usuario
     */

    async create(dto: CreateUserDto){
        // verificar si el correo 
        const existe = await this.userModule.findOne({ correo: dto.correo })
    
        // si ya existe correo
        if(existe){
            throw new BadRequestException('Correo ya registrado')
        }

        // encriptar contraseña
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModule.create({...dto,password: hashedPassword});

        return ResponseHelper.success(user, 201);
    
    }

    /**
     * consultar usuarios
     */


    async findAll(search:SearchUserDto){
        // crear filtro
        const filter: any = {activo: true};

        //filtro por nombre
        if(search.nombre){
            filter.nombre={
                $regex: search.nombre,
                $options: 'i'
            };
        }

        //paginacion
        const page= Number(search.page) || 1;
        const limit= Number(search.limit) || 10;

        //consulta
        const data = await this.userModule.find(filter).populate('rol_id').skip((page-1)*limit).limit(limit);

        // contador de documentos = contdor de usuarios
        const total = await this.userModule.countDocuments(filter); 

        return ResponseHelper.success({
            total,
            page,
            limit,
            data
        });
    }

    /**
     * consulta por id de usuario
     */

    async findOne(id:string){
        const user = await this .userModule.findById(id).populate('rol_id');
        

        if(!user){
            throw new NotFoundException('usuariono encontrado')
        }


        return ResponseHelper.success(user)
        
    }

    /**
     * actualizacion de horario 
     */

    async update(id:string, dto: UpdateUserDto){

        const user = await this.userModule.findById(id);

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }
        if(dto.password){
            dto.password = await bcrypt.hash(dto.password, 10);}

        const updateuser = await this.userModule.findByIdAndUpdate(id, dto, {new: true});

        return ResponseHelper.success(updateuser);
    }

    /**
     * actualizacion parcial de usuario
     */

    async partialUpdate(id:string, dto: UpdateUserDto){

        const user = await this.userModule.findById(id);

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }
        if(dto.password){
            dto.password = await bcrypt.hash(dto.password, 10);}

        const updateuser = await this.userModule.findByIdAndUpdate(id, { $set: dto }, {new: true});

        return ResponseHelper.success(updateuser);
    }

    /**
     * soft delete
     */

    async remove(id:string){
        const user = await this.userModule.findById(id);

        if(!user){
            throw new NotFoundException('usuario no encontrado')
        }

    

        const deleteuser = await this.userModule.findByIdAndUpdate(id,{activo: false},{new: true});

        return ResponseHelper.success(deleteuser);
    }

    /**
     * restaurar usuario
     */

    async restore(id:string){
        const user = await this.userModule.findById(id);

        if(!user){
            throw new NotFoundException('usuario no encontrado')
        }

        const restoreuser = await this.userModule.findByIdAndUpdate(id,{activo: true},{new: true});

        return ResponseHelper.success(restoreuser);
    }

}