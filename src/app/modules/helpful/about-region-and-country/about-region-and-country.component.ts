import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {Router} from '@angular/router';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-about-region-and-country',
  templateUrl: './about-region-and-country.component.html',
  styleUrls: ['./about-region-and-country.component.scss']
})
export class AboutRegionAndCountryComponent implements OnInit {

  constructor(public ls: LanguageService, public navService: NavBarService, private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.navService.deselectAll();
      this.navService.regionAndCountrySelected = true;
      this.navService.helpSelected = true;
      if (this.router.url.indexOf('varna') !== -1) {
        this.navService.varnaSelected = true;
      } else if (this.router.url.indexOf('bulgaria') !== -1) {
        this.navService.bulgariaSelected = true;
      } else if (this.router.url.indexOf('regions') !== -1) {
        this.navService.regionsSelected = true;
      }
    }, 0);
  }
}
