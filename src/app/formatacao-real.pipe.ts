import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatacaoReal'
})
export class FormatacaoRealPipe implements PipeTransform {

  transform(valor: number, tipo: any): unknown {
    let array = (valor.toFixed(2) + "").split(".");
    if (tipo == "R") {
      return array[0];
    }
    else if (tipo == "C") {
      return array[1];
    }
    else {
      return array;
    }
  }

}
