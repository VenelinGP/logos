import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-offer-home',
  templateUrl: './offer-home.component.html',
  styleUrls: ['./offer-home.component.scss'],
  animations: [
    trigger('routeAnimation', [
      state('*', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', animate(0, style({ opacity: 0 })))
    ])
  ]
})
export class OfferHomeComponent implements OnInit {
  fbLikePngUrl = '../../../../assets/images/fb_like.png';
  fbCommentsPngUrl = '../../../../assets/images/fb_logo.png';

  constructor(private nav: NavBarService) {}

  ngOnInit() {
    console.log('ngOnInit');
    console.log('Estates: ' + this.nav.estatesSelected);
    console.log('Home: ' + this.nav.homeSelected);
  }
}
