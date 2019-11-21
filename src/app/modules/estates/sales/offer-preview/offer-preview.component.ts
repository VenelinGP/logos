import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../../../../models/Offer';
import { BaseHttpService } from 'src/app/services/base-http/base-http.service';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {
  @Input() offer: Offer;
  noImageAvailableUrl = 'src/assets/images/no-images-available.jpg';
  constructor(public httpService: BaseHttpService) {}

  ngOnInit() {}

  clickOnSeeMore(offer: Offer): void {
    let dropdownMenuName;
    if (offer.isSellable) {
      dropdownMenuName = 'sales';
    } else if (offer.isRentable) {
      dropdownMenuName = 'rents';
    }
    // this.mainComponent.clickOnMainMenu('realEstate', dropdownMenuName);
    // this.offerService.selectOffer(offer.id);
  }
}
