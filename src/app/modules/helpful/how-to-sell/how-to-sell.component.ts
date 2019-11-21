import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-how-to-sell',
  templateUrl: './how-to-sell.component.html',
  styleUrls: ['./how-to-sell.component.scss']
})
export class HowToSellComponent implements OnInit {

  constructor(public ls: LanguageService, private nav: NavBarService) { }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.helpSelected = true;
      this.nav.howToSellSelected = true;
    },0);
  }

}
