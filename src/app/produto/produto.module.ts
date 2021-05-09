import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload';
import { GoogleService } from 'src/lib/googleCloud';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter
    })
    
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService, GoogleService]
})
export class ProdutoModule { }
