import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaFilterComponent } from './area-filter/area-filter.component';
import { OfferHomeComponent } from './offer-home/offer-home.component';
import { OfferSliderSellableComponent } from './offer-slider-sellable/offer-slider-sellable.component';
import { OfferSliderRentableComponent } from './offer-slider-rentable/offer-slider-rentable.component';
import { OfferSearchComponent } from './offer-search/offer-search.component';
import { OfferMapComponent } from './offer-map/offer-map.component';
import { TranslateModule } from 'src/app/shared/pipes/translate/translate.module';

@NgModule({
  declarations: [
    AreaFilterComponent,
    OfferHomeComponent,
    OfferSliderSellableComponent,
    OfferSliderRentableComponent,
    OfferSearchComponent,
    OfferMapComponent
  ],
  imports: [CommonModule, TranslateModule],
  exports: [AreaFilterComponent, OfferHomeComponent]
})
export class HomeModule {}
