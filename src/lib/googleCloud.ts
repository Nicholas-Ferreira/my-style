import { Injectable } from "@nestjs/common";
import vision, { ImageAnnotatorClient } from '@google-cloud/vision'
import { Storage, UploadResponse } from '@google-cloud/storage'
import { google } from "@google-cloud/vision/build/protos/protos";
import { Loja } from "src/entities/loja.entity";
import { Produto } from "src/entities/produto.entity";

@Injectable()
export class GoogleService {
  private baseConfig = { keyFilename: '/google-key.json', projectId: 'my-style-312923' }
  public imageAnnotator: ImageAnnotatorClient
  public storage: Storage

  constructor() {
    this.storage = new Storage(this.baseConfig);
    this.imageAnnotator = new vision.ImageAnnotatorClient(this.baseConfig);
  }

  async isSafeImage(filePath: string) {
    const [safe] = await this.imageAnnotator.safeSearchDetection(filePath)
    if (safe.safeSearchAnnotation) {
      const safeStrings = ['VERY_UNLIKELY', 'UNLIKELY']
      const { adult, spoof, medical, violence, racy } = safe.safeSearchAnnotation
      if (!safeStrings.includes(adult.toString())) return { error: 'Conteúdo possivelmente adulto' }
      if (!safeStrings.includes(medical.toString())) return { error: 'Conteúdo Negado' }
      if (!safeStrings.includes(violence.toString())) return { error: 'Conteúdo possivelmente violento' }
      if (!safeStrings.includes(racy.toString())) return { error: 'Conteúdo possivelmente atrevido' }
    }

    return { error: null }
  }

  async imageDetect(filePath: string): Promise<google.cloud.vision.v1.IAnnotateImageResponse> {
    const detects = (await Promise.all([
      this.imageAnnotator.labelDetection(filePath),
      this.imageAnnotator.textDetection(filePath),
      this.imageAnnotator.logoDetection(filePath),
      this.imageAnnotator.imageProperties(filePath),
    ]))
      .map(([detect]) => {
        for (var key in detect) {
          if (Object.prototype.hasOwnProperty.call(detect, key)) {
            var element = detect[key];
            if (!element) delete detect[key]
            if (element instanceof Array)
              if (element.length == 0) delete detect[key]
          }
        }
        return detect
      })
      .reduce((acc, element) => Object.assign(acc, element))

    return detects
  }

  async uploadBucket(produto: Produto, fileUpload: Express.Multer.File) {
    const bucket = this.storage.bucket('my-style')
    
    const pathLoja = `${produto.loja.id}_${produto.loja.nome.replace(/ /g, "_").slice(0, 50)}`
    const pathProduto = `${produto.id}_${produto.titulo.replace(/ /g, "_")}`
    const pathBucket = `${pathLoja}/${pathProduto}/${fileUpload.filename}`
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${pathBucket}`

    const [file, metadata] = await bucket.upload(fileUpload.path, {
      destination: pathBucket
    })

    return publicUrl
  }
}