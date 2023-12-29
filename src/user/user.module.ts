import { Module, } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/role/roles.guard';
import { FiledataModule } from 'src/filedata/filedata.module';
import { DoctorController } from './doctor.controller';

@Module({
  controllers: [UserController,DoctorController],
  providers: [UserService],
  exports: [UserService],
  imports: [ 
    TypeOrmModule.forFeature([User]),
    FiledataModule
  ]
})
export class UserModule {}
