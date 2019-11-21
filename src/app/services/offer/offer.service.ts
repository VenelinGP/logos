import { Inject, Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslatableString } from '../../models/TranslatableString';
import { Offer } from '../../models/Offer';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { BaseHttpService } from '../../services/base-http/base-http.service';
import { AreaService } from '../area/area.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  // offersUrl = 'src/Lib/App/Temp/mock-offers.json';
  // picturesApiUrl: string = '/api/picture/picture';
  // offersUrl = '127.0.0.1:8002/api/property/property';
  optionsUrl = 'src/Lib/App/Temp/mock-options.json';

  mainSlidersOffers: Offer[];

  offers: Offer[];
  filteredOffers: Offer[];

  propertyTypes: {
    key: TranslatableString;
    subtypes: { key: TranslatableString; value: boolean }[];
  }[];
  // propertyTypes: {key: string, subtypes: {key: string, value: boolean}[]}[];
  selectedType: {
    key: TranslatableString;
    subtypes: { key: TranslatableString; value: boolean }[];
  };
  priceFrom: string;
  priceTo: string;
  spaceFrom: string;
  spaceTo: string;
  searchId: string;
  selectedCurrency: string;
  selectedFilteredPageIndex: number;
  selectedOffer: Offer;
  similarOffers: Offer[];
  currentOfferType: string;

  offerRequestSent: boolean;
  mainSliderOfferRequestSent: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpService: BaseHttpService,
    public areaService: AreaService,
    public router: Router,
    private http: HttpClient
  ) {
    this.offers = [];
    this.filteredOffers = [];
    this.mainSlidersOffers = [];
    this.mainSliderOfferRequestSent = true;
  }

  // whenOffersReady() {
  //   if (this.offers.length > 0) {
  //     return this.offers;
  //   } else if (this.offerRequestSent) {
  //     setTimeout(() => {
  //       this.whenOffersReady();
  //     }, 500);
  //   } else {
  //     this.offerRequestSent = true;
  //     this.httpService.whenMainSlidersOffersReady().subscribe(offersData => {
  //       for (let i = 0; i < offersData.length; i++) {
  //         this.offers[i] = new Offer(offersData[i]);
  //       }
  //       return this.offers;
  //     });
  //   }
  // }

  whenMainSlidersOffersReady(): Offer[] {
    if (this.mainSlidersOffers.length > 0) {
      return this.mainSlidersOffers;
    } else if (this.mainSliderOfferRequestSent) {
      setTimeout(() => {
        this.whenMainSlidersOffersReady();
      }, 500);
    } else {
      this.mainSliderOfferRequestSent = true;
      this.httpService.getMainPageSlidersOffers().subscribe(offerData => {
        for (let i = 0; i < offerData.length; i++) {
          this.mainSlidersOffers[i] = new Offer(offerData[i]);
        }
        return this.mainSlidersOffers;
      });
    }
  }

  changeSelectedCurrencyTo(newCurrency: string) {
    if (newCurrency === 'BGN') {
      this.selectedCurrency = newCurrency;
    } else if (newCurrency === 'EUR') {
      this.selectedCurrency = newCurrency;
    }
  }

  getConvertedPrice(price: string) {
    // default eur
    let defaultToCurrentCurrencyMultiplier = 0;

    if (this.selectedCurrency === 'BGN') {
      defaultToCurrentCurrencyMultiplier = 1.95583;
    } else if (this.selectedCurrency === 'EUR') {
      defaultToCurrentCurrencyMultiplier = 1;
    }
  }
}
