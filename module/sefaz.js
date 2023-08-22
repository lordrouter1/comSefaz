const builder = require('xmlbuilder');

class SefazCom {
    constructor(){
        this.nfe = builder.create('NFe',{version:'1.0',encoding:'UTF-8'});
        this.infNFe = this.nfe.ele('infNFe',{Id:'NFe00000000000000000000000',versao:'4.00'});
    }

    setNfeInf(_Id,_versao){
        this.infNFe = this.nfe.ele('infNFe',{Id:`NFe${_Id}`,versao:_versao});
    }

    setIde(_cUF){
        this.ide = this.infNFe.ele('ide');

        // Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE de código de unidades da federação (Seção 8.1 do MOC – Visão Geral, Tabela de UF, Município e País).
        this.ide.ele('cUF',_cUF);
        // Código numérico que compõe a Chave de Acesso. Número aleatório gerado pelo emitente para cada NF-e para evitar acessos indevidos da NF-e. (v2.0).
        this.ide.ele('cNF',_cNF);
        // Informar a natureza da operação de que decorrer a saída ou a entrada, tais como: venda, compra, transferência, devolução, importação, consignação, remessa (para fins de demonstração, de industrialização ou outra), conforme previsto na alínea 'i', inciso I, art. 19 do CONVÊNIO S/Nº, de 15 de dezembro de 1970.
        this.ide.ele('natOp',_natOp);
        // 55=NF-e emitida em substituição ao modelo 1 ou 1A; 65=NFC-e, utilizada nas operações de venda no varejo (a critério da UF aceitar este modelo de documento).
        this.ide.ele('mod',_mod);
        // Série do Documento Fiscal, preencher com zeros na hipótese de a NF-e não possuir série. Série na faixa: - [000-889]: Aplicativo do Contribuinte; Emitente=CNPJ; Assinatura pelo e-CNPJ do contribuinte (procEmi<>1,2); - [890-899]: Emissão no site do Fisco (NFA-e - Avulsa); Emitente= CNPJ / CPF; Assinatura pelo e-CNPJ da SEFAZ (procEmi=1); - [900-909]: Emissão no site do Fisco (NFA-e); Emitente= CNPJ; Assinatura pelo e-CNPJ da SEFAZ (procEmi=1), ou Assinatura pelo e-CNPJ do contribuinte (procEmi=2); - [910-919]: Emissão no site do Fisco (NFA-e); Emitente= CPF; Assinatura pelo e-CNPJ da SEFAZ (procEmi=1), ou Assinatura pelo e-CPF do contribuinte (procEmi=2); - [920-969]: Aplicativo do Contribuinte; Emitente=CPF; Assinatura pelo e-CPF do contribuinte (procEmi<>1,2); (Atualizado NT 2018/001)
        this.ide.ele('serie',_serie);
        // Número do Documento Fiscal.
        this.ide.ele('nNF',_nNF);
        // Data e hora no formato UTC (Universal Coordinated Time): AAAA-MM-DDThh:mm:ssTZD
        this.ide.ele('dhEmi',(new Date()).toISOString());
        // 0=Entrada; 1=Saída
        this.ide.ele('tpNF',_tpNF);
        // 1=Operação interna; 2=Operação interestadual; 3=Operação com exterior.
        this.ide.ele('idDest',_idDest);
        // Informar o município de ocorrência do fato gerador do ICMS. Utilizar a Tabela do IBGE (Seção 8.2 do MOC – Visão Geral, Tabela de UF, Município e País)
        this.ide.ele('cMunFG',_cMunFG);
        // 0=Sem geração de DANFE; 1=DANFE normal, Retrato; 2=DANFE normal, Paisagem; 3=DANFE Simplificado; 4=DANFE NFC-e; 5=DANFE NFC-e em mensagem eletrônica (o envio de mensagem eletrônica pode ser feita de forma simultânea com a impressão do DANFE; usar o tpImp=5 quando esta for a única forma de disponibilização do DANFE).
        this.ide.ele('tpImp',_tpImp);
        // 1=Emissão normal (não em contingência); 2=Contingência FS-IA, com impressão do DANFE em Formulário de Segurança - Impressor Autônomo; 3=Contingência SCAN (Sistema de Contingência do Ambiente Nacional); *Desativado * NT 2015/002 4=Contingência EPEC (Evento Prévio da Emissão em Contingência); 5=Contingência FS-DA, com impressão do DANFE em Formulário de Segurança - Documento Auxiliar; 6=Contingência SVC-AN (SEFAZ Virtual de Contingência do AN); 7=Contingência SVC-RS (SEFAZ Virtual de Contingência do RS); 9=Contingência off-line da NFC-e; Observação: Para a NFC-e somente é válida a opção de contingência: 9-Contingência Off-Line e, a critério da UF, opção 4-Contingência EPEC. (NT 2015/002)
        this.ide.ele('tpEmis',_tpEmis);
        //
        this.ide.ele('cDV',);
    }

    gerarNFe(){
        return this.nfe.end({ pretty: true });
    }

    calcularDV(chaveAcesso) {
        const peso = [2, 3, 4, 5, 6, 7, 8, 9];
        let soma = 0;
      
        for (let i = chaveAcesso.length - 1; i >= 0; i--) {
          const digito = parseInt(chaveAcesso.charAt(i), 10);
          soma += digito * peso[i % 8];
        }
      
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
      }
}

module.exports = SefazCom