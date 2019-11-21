import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  constructor(private nav: NavBarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.estatesSelected = true;
      this.nav.subscriptionSelected = true;
    }, 0);
  }
}
