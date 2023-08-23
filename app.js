const SefazCom = require('./module/sefaz');

const seCon = new SefazCom();

function calcularDV(chaveAcesso) {
    const peso = [4,3,2,9,8,7,6,5];
    let soma = 0;
  
    for (let i = 0; i < chaveAcesso.length; i++) {
      const digito = parseInt(chaveAcesso.charAt(i), 10);
      soma += digito * peso[i%8];
      console.log(peso[i],i);
    }
  
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

console.log (calcularDV('4323081065692600019355001000014436100173631'));