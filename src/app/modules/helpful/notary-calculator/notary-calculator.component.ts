import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {BaseHttpService} from '../../../services/base-http/base-http.service';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-notary-calculator',
  templateUrl: './notary-calculator.component.html',
  styleUrls: ['./notary-calculator.component.scss']
})
export class NotaryCalculatorComponent implements OnInit {

  notaryTax: number;
  registrationTax: number;
  councilTax: number;
  totalTax: number;

  constructor(public ls: LanguageService, public baseHttp: BaseHttpService, private nav: NavBarService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.helpSelected = true;
      this.nav.notaryCalculatorSelected = true;
    }, 0);

    this.notaryTax = 0;
    this.registrationTax = 0;
    this.councilTax = 0;
    this.totalTax = 0;
  }

  onValueUpdate(element) {
    const dealPrice = parseFloat(element.value);
    if (!dealPrice) {
      this.notaryTax = 0;
      this.councilTax = 0;
      this.registrationTax = 0;
      return;
    }
    let notarialPrice = 0;
    if (dealPrice <= 100) {
      notarialPrice = 30;
    } else if (dealPrice <= 1000) {
      notarialPrice = 30 + (1.5 / 100) * (dealPrice - 100);
    } else if (dealPrice <= 10000) {
      notarialPrice = 43.5 + (1.3 / 100) * (dealPrice - 1000);
    } else if (dealPrice <= 50000) {
      notarialPrice = 160.5 + (0.8 / 100) * (dealPrice - 10000);
    } else if (dealPrice <= 100000) {
      notarialPrice = 480.50 + (0.5 / 100) * (dealPrice - 50000);
    } else if (dealPrice <= 500000) {
      notarialPrice = 730.5 + (0.2 / 100) * (dealPrice - 100000);
    } else {
      notarialPrice = 1530.5 + (0.1 / 100) * (dealPrice - 500000);
      notarialPrice = notarialPrice > 6000 ? 6000 : notarialPrice;
    }

    this.notaryTax = Math.round(notarialPrice * 100) / 100;
    this.registrationTax = Math.round(dealPrice * this.baseHttp.entryTax * 100) / 10000;
    this.councilTax = Math.round(dealPrice * this.baseHttp.localTax * 100) / 10000;
    this.totalTax = this.notaryTax + this.registrationTax + this.councilTax;
  }

}
