import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotaryCalculatorComponent} from './notary-calculator/notary-calculator.component';
import {HowToSellComponent} from './how-to-sell/how-to-sell.component';
import {AboutRegionAndCountryComponent} from './about-region-and-country/about-region-and-country.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [NotaryCalculatorComponent, HowToSellComponent, AboutRegionAndCountryComponent],
  imports: [
    CommonModule, BrowserModule
  ],
  exports: [NotaryCalculatorComponent, HowToSellComponent, AboutRegionAndCountryComponent],
})
export class HelpfulModule {
}
