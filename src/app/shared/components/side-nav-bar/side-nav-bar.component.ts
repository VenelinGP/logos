import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';
import { LanguageService } from '../../../services/languages/language.service';
import { TranslateService } from '../../pipes/translate/translate.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  currentLanguageKey = 'bg';

  constructor(
    public navService: NavBarService,
    public ls: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}
  setLang(lang: string) {
    this.translateService.use(lang);
    this.currentLanguageKey = lang;
  }
}
