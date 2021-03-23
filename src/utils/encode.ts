import _ from 'lodash';
import request from 'request';

export function get(url): Promise<{ err, response, body }> {
  return new Promise(resolve => {
    request({ url, encoding: null }, (err, response, body) => {
      return resolve({ err, response, body });
    });
  });
}

export default async function encode(url) {
  if (_.isUndefined(url) || _.isNull(url) || !_.isString(url)) {
    return { error: 'A url não está formatada corretamente' };
  }

  const { err, response, body } = await get(url);
  if (err) return { error: 'Erro ao recuperar a imagem' };

  if (response.statusCode === 200) {
    const type = response.headers['content-type'];
    const content = body.toString('base64');
    return { type, content };
  }

  return {
    error: `Algo deu errado com a recuperação da imagem`,
    statusCode: response.statusCode
  };
}
