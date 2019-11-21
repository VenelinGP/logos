import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  constructor(private nav: NavBarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.estatesSelected = true;
      this.nav.createOfferSelected = true;
    }, 0);
  }
}
