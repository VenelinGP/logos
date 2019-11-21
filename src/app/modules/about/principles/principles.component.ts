import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-principles',
  templateUrl: './principles.component.html',
  styleUrls: ['./principles.component.scss']
})
export class PrinciplesComponent implements OnInit {

  constructor(public ls: LanguageService, private nav: NavBarService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.aboutSelected = true;
      this.nav.principlesSelected = true;
    }, 0);
  }
}
