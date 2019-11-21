import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/languages/language.service';
import { Router } from '@angular/router';
import { BaseHttpService } from './services/base-http/base-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  static language = 'bg';
  static mainUrl = 'http://api.logos.bg';
  // static mainUrl = '';

  isMenuHidden: boolean;
  selectedMainMenu: string;
  selectedDropMenuOption: string;

  constructor(
    public languageService: LanguageService,
    public httpService: BaseHttpService,
    private router: Router
  ) {}

  ngOnInit() {}

  public clickOnMainMenu(menu: string, dropMenuOption: string = ''): void {
    if (
      this.selectedMainMenu !== menu ||
      this.selectedDropMenuOption !== dropMenuOption
    ) {
      this.httpService.selectedFilteredPageIndex = 1;
    }
    if (dropMenuOption === '') {
      this.hideMobileMenu();
    } else if (
      this.selectedMainMenu === menu &&
      this.selectedDropMenuOption !== dropMenuOption
    ) {
      this.hideMobileMenu();
    }
    this.selectedMainMenu = menu;
    this.selectedDropMenuOption = dropMenuOption;
  }

  public hideMobileMenu(): void {
    this.isMenuHidden = true;
  }
}
