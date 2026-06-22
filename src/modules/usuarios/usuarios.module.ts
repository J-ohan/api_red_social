import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { RolesModule } from '../roles/roles.module';
import { User } from './schemas/user.schema';

@Module({
imports: [
    RolesModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
],
controllers: [UsuariosController],
providers: [UsuariosService],
})
export class UsuariosModule {}