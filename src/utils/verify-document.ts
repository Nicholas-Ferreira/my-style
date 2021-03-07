export class VerifyDocument {
  isCpfOrCnpj(value) {

    // Garante que o valor é uma string
    value = value.toString();

    // Remove caracteres inválidos do valor
    value = value.replace(/[^0-9]/g, '');

    // Verifica CPF
    if (value.length === 11) {
      return 'CPF';
    }

    // Verifica CNPJ
    else if (value.length === 14) {
      return 'CNPJ';
    }

    // Não retorna nada
    else {
      return false;
    }

  } // verifica_cpf_cnpj

  /*
  calc_digitos_posicoes
  
  Multiplica dígitos vezes posições
  
  @param string digitos Os digitos desejados
  @param string posicoes A posição que vai iniciar a regressão
  @param string soma_digitos A soma das multiplicações entre posições e dígitos
  @return string Os dígitos enviados concatenados com o último dígito
  */
  calculatePositionDigits(digits, positions = 10, digitsSum = 0) {

    // Garante que o value é uma string
    digits = digits.toString();

    // Faz a soma dos dígitos com a posição
    // Ex. para 10 posições:
    //   0    2    5    4    6    2    8    8   4
    // x10   x9   x8   x7   x6   x5   x4   x3  x2
    //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
    for (var i = 0; i < digits.length; i++) {
      // Preenche a soma com o dígito vezes a posição
      digitsSum = digitsSum + (digits[i] * positions);

      // Subtrai 1 da posição
      positions--;

      // Parte específica para CNPJ
      // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
      if (positions < 2) {
        // Retorno a posição para 9
        positions = 9;
      }
    }

    // Captura o resto da divisão entre soma_digitos dividido por 11
    // Ex.: 196 % 11 = 9
    digitsSum = digitsSum % 11;

    // Verifica se soma_digitos é menor que 2
    if (digitsSum < 2) {
      // soma_digitos agora será zero
      digitsSum = 0;
    } else {
      // Se for maior que 2, o resultado é 11 menos soma_digitos
      // Ex.: 11 - 9 = 2
      // Nosso dígito procurado é 2
      digitsSum = 11 - digitsSum;
    }

    // Concatena mais um dígito aos primeiro nove dígitos
    // Ex.: 025462884 + 2 = 0254628842
    var cpf = digitsSum + digitsSum;

    // Retorna
    return cpf;

  } // calc_digitos_posicoes

  /*
  Valida CPF
  
  Valida se for CPF
  
  @param  string cpf O CPF com ou sem pontos e traço
  @return bool True para CPF correto - False para CPF incorreto
  */
  validCpf(cpf) {
    // Garante que o value é uma string
    cpf = cpf.toString();
    // Remove caracteres inválidos do value
    cpf = cpf.replace(/[^0-9]/g, '');
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  } // valida_cpf

  /*
  valida_cnpj
  
  Valida se for um CNPJ
  
  @param string cnpj
  @return bool true para CNPJ correto
  */
  validCnpj(cnpj) {
    cnpj = cnpj.toString();
    cnpj = cnpj.replace(/[^0-9]/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;

    return true;
  } // valida_cnpj

  /*
  valida_cpf_cnpj
  
  Valida o CPF ou CNPJ
  
  @access public
  @return bool true para válido, false para inválido
  */
  isValidCpfOrCnpj(value) {

    // Verifica se é CPF ou CNPJ
    var document = this.isCpfOrCnpj(value);

    // Garante que o value é uma string
    value = value.toString();

    // Remove caracteres inválidos do value
    value = value.replace(/[^0-9]/g, '');


    // Valida CPF
    if (document === 'CPF') {
      // Retorna true para cpf válido
      return this.validCnpj(value);
    }

    // Valida CNPJ
    else if (document === 'CNPJ') {
      // Retorna true para CNPJ válido
      return this.validCnpj(value);
    }

    // Não retorna nada
    else {
      return false;
    }

  } // valida_cpf_cnpj
}