import { Component, OnInit } from '@angular/core';
import { Offer } from '../../../models/Offer';
import { BaseHttpService } from 'src/app/services/base-http/base-http.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-offer-slider-sellable',
  templateUrl: './offer-slider-sellable.component.html',
  styleUrls: ['./offer-slider-sellable.component.scss']
})
export class OfferSliderSellableComponent implements OnInit {
  offers: Offer[];
  mainSliderOfferRequestSent: boolean;
  maxOffersInSlider = 5;
  selectedOfferIndex = 0;
  canClickArrowLeft: boolean;
  canClickArrowRight: boolean;

  autoScrollInterval;

  noImageAvailableUrl = 'src/assets/images/no-images-available.jpg';

  constructor(
    private mainComponent: AppComponent,
    public httpService: BaseHttpService
  ) {
    this.offers = [];
    this.mainSliderOfferRequestSent = false;
  }

  ngOnInit() {
    this.getOffers();
    this.updateArrows();
  }

  getOffers() {
    if (this.offers.length > 0) {
      return this.offers;
    } else if (this.mainSliderOfferRequestSent) {
      setTimeout(() => {
        return this.offers;
      }, 500);
    } else {
      this.mainSliderOfferRequestSent = true;
      this.httpService.getMainPageSlidersOffers().subscribe(dataOferrs => {
        const filteredOffers = dataOferrs.filter(
          offer => offer.property_for_sale === true
        );
        console.log('За продажба');
        console.log(filteredOffers);
        for (let i = 0; i < filteredOffers.length; i++) {
          this.offers[i] = new Offer(filteredOffers[i]);
        }
        return this.offers;
      });
    }
  }

  private updateArrows() {
    this.canClickArrowLeft = this.selectedOfferIndex > 0;
    this.canClickArrowRight = this.selectedOfferIndex < this.offers.length - 1;
  }

  resetAutoScrollInterval() {
    this.clearAutoScrollInterval();
    this.autoScrollInterval = setInterval(() => {
      this.selectedOfferIndex =
        this.selectedOfferIndex < this.offers.length - 1
          ? this.selectedOfferIndex + 1
          : 0;
      this.updateArrows();
    }, 5000);
  }

  clearAutoScrollInterval() {
    clearInterval(this.autoScrollInterval);
  }

  clickOnSeeMore(offer: Offer): void {
    this.mainComponent.clickOnMainMenu('realEstate', 'sales');
    this.httpService.selectOffer(offer.id);
  }

  clickArrowLeft(): void {
    if (this.canClickArrowLeft) {
      this.selectedOfferIndex--;
      this.resetAutoScrollInterval();
      this.updateArrows();
    } else {
      this.clickCircle(this.offers.length - 1);
    }
  }

  clickArrowRight(): void {
    if (this.canClickArrowRight) {
      this.selectedOfferIndex++;
      this.resetAutoScrollInterval();
      this.updateArrows();
    } else {
      this.clickCircle(0);
    }
  }

  clickCircle(circleIndex: number): void {
    this.selectedOfferIndex = circleIndex;
    this.resetAutoScrollInterval();
    this.updateArrows();
  }
}
