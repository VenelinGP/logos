import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/languages/language.service';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(public ls: LanguageService, private nav: NavBarService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.aboutSelected = true;
      this.nav.teamSelected = true;
    }, 0);
  }
}
