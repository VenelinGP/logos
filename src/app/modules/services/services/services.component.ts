import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {

  constructor(public ls: LanguageService, private nav: NavBarService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.servicesSelected = true;
    }, 0);
  }

}
