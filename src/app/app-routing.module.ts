import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferHomeComponent } from './modules/home/offer-home/offer-home.component';

import { ServicesComponent } from './modules/services/services/services.component';
import { SalesComponent } from './modules/estates/sales/sales.component';
import { RentsComponent } from './modules/estates/rents/rents.component';
import { OfferComponent } from './modules/estates/offer/offer.component';
import { CreateOfferComponent } from './modules/estates/create-offer/create-offer.component';
import { SubscriptionComponent } from './modules/estates/subscription/subscription.component';
import { NewsComponent } from './modules/news/news/news.component';
import { AboutRegionAndCountryComponent } from './modules/helpful/about-region-and-country/about-region-and-country.component';
import { NotaryCalculatorComponent } from './modules/helpful/notary-calculator/notary-calculator.component';
import { HowToSellComponent } from './modules/helpful/how-to-sell/how-to-sell.component';
import { HistoryComponent } from './modules/about/history/history.component';
import { PrinciplesComponent } from './modules/about/principles/principles.component';
import { TeamComponent } from './modules/about/team/team.component';
import { ContactsComponent } from './modules/contacts/contacts/contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'bg', pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: OfferHomeComponent },
      {
        path: 'estates',
        children: [
          { path: '', redirectTo: 'sales', pathMatch: 'full' },
          { path: 'sales', component: SalesComponent },
          { path: 'rents', component: RentsComponent },
          { path: 'create-offer', component: CreateOfferComponent },
          { path: 'subscription', component: SubscriptionComponent },
          { path: 'offer/:id', component: OfferComponent }
        ]
      },
      { path: 'news', component: NewsComponent },
      { path: 'services', component: ServicesComponent },
      {
        path: 'help',
        children: [
          { path: '', redirectTo: 'more-info', pathMatch: 'full' },
          {
            path: 'more-info',
            children: [
              { path: '', redirectTo: 'bulgaria', pathMatch: 'full' },
              { path: ':pageId', component: AboutRegionAndCountryComponent }
            ]
          },
          { path: 'notary-calculator', component: NotaryCalculatorComponent },
          { path: 'selling-your-estate', component: HowToSellComponent }
        ]
      },
      {
        path: 'about',
        children: [
          { path: '', redirectTo: 'history', pathMatch: 'full' },
          { path: 'history', component: HistoryComponent },
          { path: 'principles', component: PrinciplesComponent },
          { path: 'our-team', component: TeamComponent }
        ]
      },
      { path: 'contacts', component: ContactsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
