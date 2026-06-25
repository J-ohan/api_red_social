import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaccion, ReaccionDocument } from './schemas/reacciones-schema';
import { CreateReaccionDto } from './dto/create-reacciones.dto';
import { UpdateReaccionDto } from './dto/update-reacciones.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reaccion.name)
        private readonly reaccionModel: Model<ReaccionDocument>,
    ) {}

    async create(
        dto: CreateReaccionDto
    ) {
        const reaccion =
        await this.reaccionModel.create(dto);

        return ResponseHelper.success(
            reaccion,
            201
        );
    }

    async findAll() {
        const reacciones =
        await this.reaccionModel
            .find({ activo: true })
            .populate('publicacion_id')
            .populate('usuario_id', '-password');

        return ResponseHelper.success(reacciones);
    }

    async findOne(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reacción no encontrada');
        }
        return ResponseHelper.success(reaccion);
    }

    async update(id: string, dto: UpdateReaccionDto) {
        const reaccion = await this.reaccionModel.findById(id);
        if (!reaccion) {
        throw new NotFoundException('Reacción no encontrada');
        }
        const updatedReaccion = await this.reaccionModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updatedReaccion);
    }

    async partialUpdate(id: string, dto: UpdateReaccionDto) {
        const reaccion = await this.reaccionModel.findById(id);
        if (!reaccion) {
        throw new NotFoundException('Reacción no encontrada');
        }
        const updatedReaccion = await this.reaccionModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
        return ResponseHelper.success(updatedReaccion);
    }

    async remove(id: string) {
        const reaccion = await this.reaccionModel.findById(id);
        if (!reaccion) {
        throw new NotFoundException('Reacción no encontrada');
        }
        const deletedReaccion = await this.reaccionModel.findByIdAndUpdate(id, { activo: false }, { new: true });
        return ResponseHelper.success(deletedReaccion);
    }

    async restore(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reacción no encontrada');
        }
        const restoredReaccion = await this.reaccionModel.findByIdAndUpdate(id, { activo: true }, { new: true });

        return ResponseHelper.success(restoredReaccion);
    }
}