import { 
    Get,
    Res,
    Post,
    Param, 
    Controller, 
    UploadedFile,
    UseInterceptors, 
    ParseFilePipeBuilder,
    HttpStatus,
    UseGuards} from '@nestjs/common';
import { FiledataService } from './filedata.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { HasRole } from 'src/role/roles.decorator';
import { Roles } from 'src/role/roles.enum';

 const MAX_FILE_SIZE = 2 * 1024 * 1024;


@Controller('api/v1/files')
export class FiledataController {

    constructor( private fileService: FiledataService ) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile(
        new ParseFilePipeBuilder().addMaxSizeValidator({
            maxSize: MAX_FILE_SIZE
        }).build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    ) file: Express.Multer.File) {
            return this.fileService.uploadFile(file);
    }


    @Get('image/:filename')
    seeUploadedFile(@Param('filename') image :string, @Res() res :Response) { 
        return res.sendFile(image, { root: './src/uploads' });
    }

    @Get(':filename')
    getFileData(@Param('filename') filename :string) { 
        return this.fileService.getFile(filename);
    }

    
    @UseGuards(JwtAuthGuard,RolesGuard)
    @HasRole(Roles.ADMIN)
    @Get()
    seeAllUploadedFiles(){
        return this.seeAllUploadedFiles()
    }


    
}

//  .addValidator(
//     new CustomFileValidator({
//         fileType: VALID_FILETYPE_MEME
//     })
// )