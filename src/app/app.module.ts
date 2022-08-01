import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormatacaoRealPipe } from './formatacao-real.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormatacaoRealPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
