import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../shared/constants';
import { IArticle } from './IArticle';
import { Observable, Subscriber } from 'rxjs';
import { INotaryInfo } from './INotaryInfo';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/Offer';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  selectedFilteredPageIndex: number;
  mainSlidersOffers: Offer[];
  mainSliderOfferRequestSent: boolean;
  constructor(private http: HttpClient, public router: Router) {
    this.http
      .get<INotaryInfo>(BASE_URL + 'calc/calc/')
      .subscribe((data: INotaryInfo) => {
        this.entryTax = data.entry_tax;
        this.localTax = data.local_tax;
      });
    this.changeSelectedCurrencyTo('EUR');
    this.selectedFilteredPageIndex = 1;
    this.mainSlidersOffers = [];
    this.mainSliderOfferRequestSent = false;
  }
  PROPERTY_SUBTYPE_URL = 'propertysubtype/propertysubtype';
  ARTICLE_URL = 'article/article/';
  NEWS_URL = '/api/news/news';
  CALCULATOR_NUMBERS_URL = '/api/calc/calc';
  LIKE_COUNTER_URL = '/api/property/like/';
  OFFER_SUBSCRIPTION_URL = '/api/subs/addsub/';
  OFFER_CREATION_URL = '/api/property/offer/';
  REQUEST_URL = '/api/contact/contact/';
  OFFERS_URL = 'property/active';
  SLIDERS_OFFERS_URL = 'property/slider/';
  SELECTED_OFFER_URL = '/api/property/single/';
  SELECTED_OFFER_PICTURES_URL = '/api/property/singlepics/';
  SELECTED_OFFER_FEATURES_URL = '/api/property/singlefeat/';

  entryTax: number;
  localTax: number;
  selectedCurrency: string;
  private getPriceNumberValue(price: string): number {
    return Number(price.replace(' ', ''));
  }

  getArticle(paramValue: string): Observable<any> {
    return this.http.get<IArticle>(BASE_URL + this.ARTICLE_URL, {
      params: { key: paramValue }
    });
  }

  getOffers(): Observable<any> {
    return this.http.get(BASE_URL + this.OFFERS_URL);
  }

  //    this.httpService.getOffers().subscribe(dataOffers => {
  //   if (this.offers.length === 0) {
  //     const filteredOffers = dataOffers.filter(
  //       offer => offer.property_for_sale === true
  //     );
  //     for (let i = 0; i < filteredOffers.length; i++) {
  //       if (i === this.maxOffersInSlider) {
  //         break;
  //       }
  //       this.offers.push(new Offer(filteredOffers[i]));
  //     }
  //     this.selectedOfferIndex = Math.round(this.offers.length / 2) - 1;
  //     this.updateArrows();
  //     this.resetAutoScrollInterval();
  //   }
  //   console.log(this.offers[0].price);
  // });

  // whenMainSlidersOffersReady(): Observable<any> {

  // }

  changeSelectedCurrencyTo(newCurrency: string) {
    if (newCurrency === 'BGN') {
      this.selectedCurrency = newCurrency;
    } else if (newCurrency === 'EUR') {
      this.selectedCurrency = newCurrency;
    }
  }

  getMainPageSlidersOffers(): Observable<any> {
    return this.http.get(BASE_URL + this.SLIDERS_OFFERS_URL);
  }
  getConvertedPrice(price: string): string {
    // default eur
    let defaultToCurrentCurrencyMultiplier = 0;

    if (this.selectedCurrency === 'BGN') {
      defaultToCurrentCurrencyMultiplier = 1.95583;
    } else if (this.selectedCurrency === 'EUR') {
      defaultToCurrentCurrencyMultiplier = 1;
    }

    let convertedPrice = (
      this.getPriceNumberValue(price) * defaultToCurrentCurrencyMultiplier
    ).toFixed(0);
    const parts = convertedPrice.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    convertedPrice = parts.join('.');
    return convertedPrice;
  }

  selectOffer(offerID: number): void {
    // this.router.navigate(['bg' + '/real-estate/offer/' + offerID.toString()]);
    this.router.navigate(['bg' + '/real-estates/sales']);
    // this.document.getElementsByClassName(
    //   'logos-main-container'
    // )[0].scrollTop = 0;
  }

  getPropertySubtypes(): Observable<any> {
    return this.http.get(BASE_URL + this.PROPERTY_SUBTYPE_URL);
  }
}
