import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comentario, ComentarioDocument } from './schemas/comentario.schema';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentario.name)
        private readonly comentarioModel: Model<ComentarioDocument>,
    ) {}

    async create(
        dto: CreateComentarioDto
    ) {
        const comentario = 
        await this.comentarioModel.create(dto);

        return ResponseHelper.success(
            comentario,
            201
        );
    }

    async findAll() {
        const comentarios = 
        await this.comentarioModel.find({ activo: true });

        return ResponseHelper.success(comentarios);
    }

    async findOne(id: string) {
        const comentario = await this.comentarioModel.findById(id);
        
        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }
        return ResponseHelper.success(comentario);
    }

    async update(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
        throw new NotFoundException('Comentario no encontrado');
        }
        const updatedComentario = await this.comentarioModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updatedComentario);
    }

    async partialUpdate(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
        throw new NotFoundException('Comentario no encontrado');
        }
        const updatedComentario = await this.comentarioModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
        return ResponseHelper.success(updatedComentario);
    }

    async remove(id: string) {
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
        throw new NotFoundException('Comentario no encontrado');
        }
        const deletedComentario = await this.comentarioModel.findByIdAndUpdate(id, { activo: false }, { new: true });
        return ResponseHelper.success(deletedComentario);
    }

    async restore(id: string) {
        const comentario = await this.comentarioModel.findById(id);
        
        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }
        const restoredComentario = await this.comentarioModel.findByIdAndUpdate(id, { activo: true }, { new: true });
        
        return ResponseHelper.success(restoredComentario);
    }
}
