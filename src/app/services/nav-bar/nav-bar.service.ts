import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../languages/language.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  homeSelected: boolean;

  estatesSelected: boolean;
  salesSelected: boolean;
  rentsSelected: boolean;
  createOfferSelected: boolean;
  subscriptionSelected: boolean;

  newsSelected: boolean;
  servicesSelected: boolean;

  helpSelected: boolean;
  regionAndCountrySelected: boolean;
  bulgariaSelected: boolean;
  varnaSelected: boolean;
  regionsSelected: boolean;

  notaryCalculatorSelected: boolean;
  howToSellSelected: boolean;

  aboutSelected: boolean;
  historySelected: boolean;
  principlesSelected: boolean;
  teamSelected: boolean;

  contactsSelected: boolean;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    this.deselectAll();
  }

  homeClicked() {
    this.router.navigate([this.languageService.currentLanguageKey, 'home']);
  }

  estatesClicked() {
    this.router.navigate([this.languageService.currentLanguageKey, 'estates']);
  }

  salesClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'estates',
      'sales'
    ]);
  }

  rentsClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'estates',
      'rents'
    ]);
  }

  createOfferClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'estates',
      'create-offer'
    ]);
  }

  subscriptionClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'estates',
      'subscription'
    ]);
  }

  newsClicked() {
    this.router.navigate([this.languageService.currentLanguageKey, 'news']);
  }

  servicesClicked() {
    this.router.navigate([this.languageService.currentLanguageKey, 'services']);
  }

  helpClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'more-info'
    ]);
  }

  countryAndRegionClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'more-info'
    ]);
  }

  bulgariaClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'more-info',
      'bulgaria'
    ]);
  }

  varnaClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'more-info',
      'varna'
    ]);
  }

  regionsClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'more-info',
      'regions'
    ]);
  }

  notaryCalculatorClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'notary-calculator'
    ]);
  }

  howToSellClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'help',
      'selling-your-estate'
    ]);
  }

  aboutClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'about',
      'history'
    ]);
  }

  historyClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'about',
      'history'
    ]);
  }

  principlesClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'about',
      'principles'
    ]);
  }

  teamClicked() {
    this.router.navigate([
      this.languageService.currentLanguageKey,
      'about',
      'our-team'
    ]);
  }

  contactsClicked() {
    this.router.navigate([this.languageService.currentLanguageKey, 'contacts']);
  }

  deselectAll() {
    this.homeSelected = false;

    this.estatesSelected = false;
    this.salesSelected = false;
    this.rentsSelected = false;
    this.createOfferSelected = false;
    this.subscriptionSelected = false;

    this.newsSelected = false;
    this.servicesSelected = false;

    this.helpSelected = false;
    this.regionAndCountrySelected = false;
    this.bulgariaSelected = false;

    this.varnaSelected = false;
    this.regionsSelected = false;
    this.notaryCalculatorSelected = false;
    this.howToSellSelected = false;

    this.aboutSelected = false;
    this.historySelected = false;
    this.principlesSelected = false;
    this.teamSelected = false;

    this.contactsSelected = false;
  }
}
