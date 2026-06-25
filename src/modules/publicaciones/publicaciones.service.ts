import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
    export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private readonly publicacionModel: Model<PublicacionDocument>,
    ) {}

    async create(dto: CreatePublicacionDto) {
        const publicacion = await this.publicacionModel.create(dto);
        return ResponseHelper.success(publicacion, 201);
    }

    async findAll() {
        const publicaciones = await this.publicacionModel
            .find({ activo: true })
            .populate('usuario_id', '-password')
            .sort({ createdAt: -1 })
            .lean();

        const data = publicaciones.map((publicacion: any) => ({
            ...publicacion,
            usuario_id: publicacion.usuario_id,
        }));

        return ResponseHelper.success(data);
    }

    async findOne(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
        throw new NotFoundException('Publicación no encontrada');
        }
        return ResponseHelper.success(publicacion);
    }

    async update(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
        throw new NotFoundException('Publicación no encontrada');
        }
        const updated = await this.publicacionModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updated);
    }

    async partialUpdate(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
        throw new NotFoundException('Publicación no encontrada');
        }
        const updated = await this.publicacionModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
        return ResponseHelper.success(updated);
    }

    async remove(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
        throw new NotFoundException('Publicación no encontrada');
        }
        const deleted = await this.publicacionModel.findByIdAndUpdate(id, { activo: false }, { new: true });
        return ResponseHelper.success(deleted);
    }

    async restore(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
        throw new NotFoundException('Publicación no encontrada');
        }
        const restored = await this.publicacionModel.findByIdAndUpdate(id, { activo: true }, { new: true });
        return ResponseHelper.success(restored);
    }
}
