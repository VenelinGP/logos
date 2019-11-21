import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '../../shared/pipes/translate/translate.module';
import { SalesComponent } from './sales/sales.component';
import { RentsComponent } from './rents/rents.component';
import { OfferComponent } from './offer/offer.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { SubscriptionComponent } from './subscription/subscription.component';

import { OfferPreviewComponent } from './sales/offer-preview/offer-preview.component';
import { SortByPricePipe } from '../../shared/pipes/sort/sort-by-price';

@NgModule({
  declarations: [
    SalesComponent,
    RentsComponent,
    OfferComponent,
    CreateOfferComponent,
    SubscriptionComponent,
    OfferPreviewComponent,
    SortByPricePipe
  ],
  imports: [CommonModule, TranslateModule],
  exports: [
    SalesComponent,
    RentsComponent,
    OfferComponent,
    CreateOfferComponent,
    SubscriptionComponent
  ]
})
export class EstatesModule {}
