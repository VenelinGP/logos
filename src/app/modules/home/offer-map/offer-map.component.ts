import { Component, OnInit, HostBinding } from '@angular/core';
import { BaseHttpService } from '../../../services/base-http/base-http.service';
import { AreaService } from '../../../services/area/area.service';
import { Offer } from 'src/app/models/Offer';
import { OfferHomeComponent } from '../offer-home/offer-home.component';

@Component({
  selector: 'app-offer-map',
  templateUrl: './offer-map.component.html',
  styleUrls: ['./offer-map.component.scss']
})
export class OfferMapComponent implements OnInit {
  @HostBinding('class.big-size') get t() {
    return this.bigMapShown;
  }

  areaInfoX = 0;
  areaInfoY = 0;
  currentAreaId = '';
  currentAreaName: string;
  currentAreaOffers: number;
  offers: Offer[];
  offerRequestSent: boolean;
  bigMapShown = false;
  zoomInImageUrl = '../../../../assets/images/ZoomIn.png';
  zoomOutImageUrl = '../../../../assets/images/ZoomOut.png';

  constructor(
    public parent: OfferHomeComponent,
    public httpService: BaseHttpService,
    public areaService: AreaService
  ) {
    this.offers = [];
    this.whenOffersReady();
    this.offerRequestSent = false;
  }

  ngOnInit() {}

  public mouseOverArea(id: string): void {
    const area = this.areaService.areas.find(a => a.id === id);
    this.currentAreaId = '';
    this.currentAreaName = '';
    this.currentAreaOffers = -1;
    if (area) {
      this.currentAreaId = id;
      this.currentAreaName = this.areaService.getAreaName(area.name);
      this.currentAreaOffers = area.offers;
    }
  }

  public mouseLeaveArea(): void {
    this.currentAreaId = '';
  }

  public mouseMove(event: MouseEvent): void {
    this.areaInfoX = event.x;
    this.areaInfoY = event.y;
  }

  public onAreaClick(id: string): void {
    const area = this.areaService.areas.find(a => a.id === id);
    if (area && area.offers >= 0) {
      area.isSelected = !area.isSelected;
    }
  }

  public onChangeMapSizeButtonClick(): void {
    this.bigMapShown = !this.bigMapShown;
  }
  whenOffersReady() {
    if (this.offers.length > 0) {
      return this.offers;
    } else if (this.offerRequestSent) {
      setTimeout(() => {
        return this.offers;
      }, 500);
    } else {
      this.offerRequestSent = true;
      this.httpService.getOffers().subscribe(dataOferrs => {
        const filteredOffers = dataOferrs.filter(
          offer => offer.property_for_rent === true
        );
        for (let i = 0; i < filteredOffers.length; i++) {
          this.offers[i] = new Offer(filteredOffers[i]);
        }
        return this.offers;
      });
    }
  }
}
