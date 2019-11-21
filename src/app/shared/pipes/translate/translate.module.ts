import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pape';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class TranslateModule {}
