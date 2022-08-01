import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "imposto";
  fatura: number = 0;
  melhorMei: string = "generic_content";
  melhorSimples: string = "generic_content";
  melhorPresumido: string = "generic_content";
  melhorReal: string = "generic_content";
  impostoMei: number = 0;
  impostoSimples: number = 0;
  impostoPresumido: number = 0;
  lucro: number = 0;
  impostoReal: number = 0;
  erro: boolean = false;

  mudancaValor(valor: string) {
    this.melhorMei = "generic_content";
    this.melhorSimples = "generic_content";
    this.melhorPresumido = "generic_content";
    this.melhorReal = "generic_content";
    this.impostoMei = 0;
    this.impostoSimples = 0;
    this.impostoPresumido = 0;
    this.fatura = parseFloat(valor);
    this.melhorRegime(this.fatura);
    if (this.fatura) {
      this.mudancaLucro(this.lucro);
    }
    else {
      this.lucro = 0;
    }
  }

  mudancaLucro(lucro: any) {
    this.melhorMei = "generic_content";
    this.melhorSimples = "generic_content";
    this.melhorPresumido = "generic_content";
    this.melhorReal = "generic_content";
    this.lucro = parseFloat(lucro);
    if (this.lucro > this.fatura) this.erro = true;
    else this.erro = false;
    if (!this.erro) {
      this.impostoReal = this.calculoReal(this.fatura, this.lucro);
    }
    this.melhorRegime(this.fatura);
  }

  menorValor(...args: any):any {
    if (!this.lucro || this.erro) {
      args.shift();
      let menorValor = args[0];
      let index = 0;
      for (let i = 0; i < args.length; i++) {
        if (menorValor > args[i]) {
          menorValor = args[i];
          index = i;
        }
      }
      switch (index) {
        case 0:
          this.melhorPresumido = "generic_content active";
          break;
        case 1:
          this.melhorSimples = "generic_content active";
          break;
        case 2:
          this.melhorMei = "generic_content active";
          break;
      };
    }
    else {
      let menorValor = args[0];
      let index = 0;
      for (let i = 0; i < args.length; i++) {
        for (let j = i + 1; j < args.length; j++) {
          if (menorValor > args[j]) {
            menorValor = args[j];
            index = j;
          }
        }
      }
      switch (index) {
        case 0:
          this.melhorReal = "generic_content active";
          break;
        case 1:
          this.melhorPresumido = "generic_content active";
          break;
        case 2:
          this.melhorSimples = "generic_content active";
          break;
        case 3:
          this.melhorMei = "generic_content active";
          break;
      };
    }
  }

  melhorRegime(fatura: number) {
    if (fatura <= 6500) {
      this.impostoMei = 61;
      this.impostoSimples = this.calculoSimples(fatura);
      this.impostoPresumido = this.calculoPresumido(fatura);
      this.menorValor(this.impostoReal, this.impostoPresumido, this.impostoSimples, this.impostoMei);
    }
    else if (fatura <= 400000) {
      this.impostoSimples = this.calculoSimples(fatura);
      this.impostoPresumido = this.calculoPresumido(fatura);
      this.menorValor(this.impostoReal, this.impostoPresumido, this.impostoSimples);
    }
    else if (fatura <= 6500000) {
      this.impostoPresumido = this.calculoPresumido(fatura);
      this.menorValor(this.impostoReal, this.impostoPresumido);
    }
    else {
      if (this.lucro) {
        this.melhorReal = "generic_content active";
      }
    }
  }

  calculoSimples(fatura: number) {
    let faturaAnual = fatura*12;
    if (faturaAnual <= 180000) {
      return fatura*0.06;
    }
    else if (faturaAnual <= 360000) {
      return fatura*0.112-780;
    }
    else if (faturaAnual <= 720000){
      return fatura*0.135-1470;
    }
    else if (faturaAnual <= 1800000){
      return fatura*0.16-2970;
    }
    else if (faturaAnual <= 3600000){
      return fatura*0.21-10470;
    }
    else {
      return fatura*0.33-54000;
    }
  }

  calculoPresumido(fatura: number) {
    let presumido = 0.32 * fatura;
    let irpj = 0;
    if (presumido > 20000) {
      irpj = presumido * 0.15 + (presumido - 20000) * 0.1;
    }
    else {
      irpj = presumido * 0.15;
    }
    let csll = presumido * 0.09;
    let iss = fatura * 0.05;
    let pis = fatura * 0.0065;
    let cofins = fatura * 0.03;
    let imposto = irpj + csll + iss + pis + cofins;
    return imposto;
  }

  calculoReal(fatura: number, lucro: number) {
    let irpj = 0;
    if (lucro > 20000) {
      irpj = lucro * 0.15 + (lucro - 20000) * 0.1;
    }
    else {
      irpj = lucro * 0.15;
    }
    let csll = lucro * 0.09;
    let iss = fatura * 0.05;
    let pis = fatura * 0.0165;
    let cofins = fatura * 0.076;
    let imposto = irpj + csll + iss + pis + cofins;
    return imposto;
  }
}
