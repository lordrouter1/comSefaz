const SefazCom = require('./module/sefaz');

const seCon = new SefazCom();

function calcularDV(chaveAcesso) {
    const peso = [4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5];
    let soma = 0;
  
    for (let i = 0; i < chaveAcesso.length; i++) {
      const digito = parseInt(chaveAcesso.charAt(i), 10);
      soma += digito * peso[i];
      console.log(peso[i],i);
    }
  
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

console.log (calcularDV('43230810656926000193550010000144'));