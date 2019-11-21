import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public ls: LanguageService, private nav: NavBarService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.aboutSelected = true;
      this.nav.historySelected = true;
    }, 0);
  }

}
