import { Module, } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/role/roles.guard';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [ TypeOrmModule.forFeature([User])]
})
export class UserModule {}
