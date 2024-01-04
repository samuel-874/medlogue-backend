import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FileData } from './filedata.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FiledataService {

    constructor(
        @InjectRepository(FileData)
        private readonly fileRepository: Repository<FileData>
    ) {}



    async uploadFile(file: Express.Multer.File): Promise<string>{

        if(!file){

            throw new UnauthorizedException("No file Attached")
        }
        const fileData = new FileData();
        fileData.name = file?.filename
        fileData.size = file?.size
        fileData.type = file?.mimetype

        this.fileRepository.save(fileData);
        
        return file.filename
    }



    async getFiles(): Promise<FileData[]>{

       return await this.fileRepository.find()
    }

    async getFile(name: string): Promise<FileData>{

        return await this.fileRepository.findOne({
            where: { name }
        })
    }

    
    async isFileExisting(name: string): Promise<boolean>{

        const isExisting = await this.fileRepository.exist({
            where: { name }
        })
                    
        if(!isExisting){
            throw new UnauthorizedException("File Doesn't Exists")
         }

         return isExisting;
    }



    async deleteFile(name: string){
        const file = await this.fileRepository.findOne({
            where: { name }
        })
        await this.fileRepository.delete(file)
        return;
    }
}
