import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/roles.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: 
        Model<RoleDocument>,
    ) {}

    /**
     * Metodo para crear un rol
     */
    async create(
        dto:CreateRoleDto,
    ){
        const role =
        await this.roleModel.create(dto);

        return ResponseHelper.success(
            role,
            200,
        );
    }

    /**
     * metodo para consutar roles
     */

    async findAll(){
        const roles = 
        await this.roleModel.find({ activo: true });

        return ResponseHelper.success(roles);
    }

    /**
     * Consultas rles eliinadas logicamente 
     */

    async findInactive(){
        const roles = await this.roleModel.find({ activo: false });
    
        return ResponseHelper.success(roles);
    }


    /**
     * Buscar un rol por id 
     */
    async findOne(id:string){
        const role=await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        return ResponseHelper.success(role);
        
    }

    /**
     * Actualizar completaemnte un rol 
     */

    async update(id:string, dto:UpdateRoleDto){
        const role = await this.roleModel.findByIdAndUpdate(id);
        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        const updatedRole = await this.roleModel.findByIdAndUpdate(id, dto, { new: true });

        return ResponseHelper.success(updatedRole);
    }

    /**
     * Actualizacion parcial
     */

    async partialUpdate(id:string, dto:UpdateRoleDto){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }

        const updatedRole = await this.roleModel.findByIdAndUpdate(id, {$set: dto}, { new: true });
        return ResponseHelper.success(updatedRole);
    }

    /**
     * Elimacion logica
     */

    async remove(id:string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        const deletedRole = await this.roleModel.findByIdAndUpdate(id, {activo: false}, {new: true});

        return ResponseHelper.success(deletedRole);

    }   
    
    /**
     * estaurar rol eliminado 
     */
    async restore(id:string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        
        const restoredRole = await this.roleModel.findByIdAndUpdate(id, {activo: true}, {new: true});

        return ResponseHelper.success(restoredRole);
    }
}
