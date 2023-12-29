
// import { FileValidator } from '@nestjs/common';
// // import * as fileType from 'file-type-meme';


// export interface CustomUploadTypeValidatorOptions {
//   fileType: string[];
// }

// export class CustomUploadFileTypeValidator extends FileValidator {
//   private _allowedMimeTypes: string[];

//   constructor(protected readonly validationOptions: CustomUploadTypeValidatorOptions) {
//     super(validationOptions);
//     this._allowedMimeTypes = this.validationOptions.fileType;
//   }

//   public isValid(file?: any): boolean {
//     const response = fileType.default(file.buffer);
//     return this._allowedMimeTypes.includes(response.mime);
//   }

//   public buildErrorMessage(): string {
//     return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
//       ', ',
//     )}`;
//   }
// }