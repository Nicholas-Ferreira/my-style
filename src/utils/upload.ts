import { CorProduto } from '../entities/produtoCor.entity';
import { extname } from "path";
import * as crypto from 'crypto'
import * as dayjs from 'dayjs'
import { TagProduto } from "src/entities/produtoTag.entity";
import { google } from "@google-cloud/vision/build/protos/protos";

export const editFileName = (req, file, callback) => {
  const name = dayjs().format('YYYY-MM-DD')
  const fileExtName = extname(file.originalname);
  const randomName = crypto.randomBytes(16).toString("hex");
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const convertLabelAnnotationsToTag = async (labelAnnotations: google.cloud.vision.v1.IEntityAnnotation[]) => {
  return (await Promise.all(labelAnnotations.map(async label => {
    const tag = new TagProduto(label.description)
    return await tag.save({ chunk: 100 })
      .catch(async err => {
        if (err.code == 'ER_DUP_ENTRY')
          return await TagProduto.findOne({ where: { description: label.description } })
        throw err
      })
  })))
}

export const convertImagePropertiesAnnotationToColors = async (colors: google.cloud.vision.v1.IColorInfo[]) => {
  return colors.map(({ color, score, pixelFraction }) => {
    const cor = new CorProduto()
    const { red, green, blue, alpha } = color
    cor.hex = hexCode(+red, +green, +blue, +alpha)
    cor.score = score
    cor.pixelFraction = pixelFraction

    return cor
  })

}

export const hexCode = (r: number, g: number, b: number, a: number) => {
  const hex =
    (r | 1 << 8).toString(16).slice(1) +
    (g | 1 << 8).toString(16).slice(1) +
    (b | 1 << 8).toString(16).slice(1) +
    ((a * 255) | 1 << 8).toString(16).slice(1)
  return `#${hex}`;
}