import { Module } from '@nestjs/common';
import { FiledataService } from './filedata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileData } from './filedata.entity';
import { FiledataController } from './filedata.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [FiledataService],
  imports: [
    TypeOrmModule.forFeature([FileData]),
    MulterModule.register({
      dest: './src/uploads'
    })
  ],
  exports: [FiledataService],
  controllers: [FiledataController]
})
export class FiledataModule {}
