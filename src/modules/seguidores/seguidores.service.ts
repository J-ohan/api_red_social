import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seguidor, SeguidorDocument } from './schemas/seguidores.schema';
import { CreateSeguidorDto } from './dto/create-seguidores.dto';
import { UpdateSeguidorDto } from './dto/update-seguidores.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class SeguidoresService {
    constructor(
        @InjectModel(Seguidor.name)
        private readonly seguidorModel: Model<SeguidorDocument>,
    ) {}

    async create(
        dto: CreateSeguidorDto
    ) {
        const seguidor =
        await this.seguidorModel.create(dto);

        return ResponseHelper.success(
            seguidor,
            201
        );
    }

    async findAll() {
        const seguidores =
        await this.seguidorModel
            .find({ activo: true })
            .populate('usuario_id', '-password')
            .populate('seguidor_id', '-password');

        return ResponseHelper.success(seguidores);
    }

    async findOne(id: string) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }
        return ResponseHelper.success(seguidor);
    }

    async update(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.seguidorModel.findById(id);
        if (!seguidor) {
        throw new NotFoundException('Seguidor no encontrado');
        }
        const updatedSeguidor = await this.seguidorModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updatedSeguidor);
    }

    async partialUpdate(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.seguidorModel.findById(id);
        if (!seguidor) {
        throw new NotFoundException('Seguidor no encontrado');
        }
        const updatedSeguidor = await this.seguidorModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
        return ResponseHelper.success(updatedSeguidor);
    }

    async remove(id: string) {
        const seguidor = await this.seguidorModel.findById(id);
        if (!seguidor) {
        throw new NotFoundException('Seguidor no encontrado');
        }
        const deletedSeguidor = await this.seguidorModel.findByIdAndUpdate(id, { activo: false }, { new: true });
        return ResponseHelper.success(deletedSeguidor);
    }

    async restore(id: string) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }
        const restoredSeguidor = await this.seguidorModel.findByIdAndUpdate(id, { activo: true }, { new: true });

        return ResponseHelper.success(restoredSeguidor);
    }
}