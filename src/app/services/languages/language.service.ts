import { EventEmitter, Injectable } from '@angular/core';
import { ILanguage } from './ILanguage';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { BaseHttpService } from '../base-http/base-http.service';
import { filter, first } from 'rxjs/operators';
import { IArticle } from '../base-http/IArticle';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage: ILanguage;
  currentLanguageKey: string;
  available: boolean;
  private initialLanguage: string;
  private languages: { bg: ILanguage; en: ILanguage; ru: ILanguage };

  constructor(
    private http: HttpClient,
    private router: Router,
    private baseHttp: BaseHttpService
  ) {
    this.languages = { bg: null, en: null, ru: null };
    this.getLanguage('bg').subscribe((bg: ILanguage) => {
      this.languages.bg = bg;
    });
    this.getLanguage('en').subscribe((en: ILanguage) => {
      this.languages.en = en;
    });
    this.getLanguage('ru').subscribe((ru: ILanguage) => {
      this.languages.ru = ru;
    });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        first()
      )
      .subscribe(res => {
        this.initialLanguage = (res as NavigationEnd).urlAfterRedirects.substring(
          1,
          3
        );
        const interval = setInterval(() => {
          if (this.languages[this.initialLanguage]) {
            clearInterval(interval);
            this.setLanguage(this.initialLanguage);
            this.available = true;
            this.getCompanyServices();
            this.getVarna();
            this.getBulgaria();
            this.getRegions();
            this.getHowTo();
            this.getHistory();
            this.getPrinciples();
          }
        }, 100);
      });
  }

  translate(key: string) {
    return this.currentLanguage[key];
  }

  setLanguage(key: string) {
    if (key === 'bg' && this.currentLanguageKey !== 'bg') {
      this.currentLanguageKey = 'bg';
      this.currentLanguage = this.languages.bg;
      this.navigateTo(key);
    }
    if (key === 'en' && this.currentLanguageKey !== 'en') {
      this.currentLanguageKey = 'en';
      this.currentLanguage = this.languages.en;
      this.navigateTo(key);
    }
    if (key === 'ru' && this.currentLanguageKey !== 'ru') {
      this.currentLanguageKey = 'ru';
      this.currentLanguage = this.languages.ru;
      this.navigateTo(key);
    }
  }

  getCompanyServices() {
    this.baseHttp.getArticle('companyServices').subscribe((value: IArticle) => {
      this.languages.bg.SERVICES_HEADER = value[0].header_bg;
      this.languages.bg.SERVICES_ARTICLE = value[0].article_bg;
      this.languages.en.SERVICES_HEADER = value[0].header_en;
      this.languages.en.SERVICES_ARTICLE = value[0].article_en;
      this.languages.ru.SERVICES_HEADER = value[0].header_ru;
      this.languages.ru.SERVICES_ARTICLE = value[0].article_ru;
    });
  }

  getBulgaria() {
    this.baseHttp.getArticle('country').subscribe((value: IArticle) => {
      this.languages.bg.BULGARIA_HEADER = value[0].header_bg;
      this.languages.bg.BULGARIA_ARTICLE = value[0].article_bg;
      this.languages.en.BULGARIA_HEADER = value[0].header_en;
      this.languages.en.BULGARIA_ARTICLE = value[0].article_en;
      this.languages.ru.BULGARIA_HEADER = value[0].header_ru;
      this.languages.ru.BULGARIA_ARTICLE = value[0].article_ru;
    });
  }

  getVarna() {
    this.baseHttp.getArticle('city').subscribe((value: IArticle) => {
      this.languages.bg.VARNA_HEADER = value[0].header_bg;
      this.languages.bg.VARNA_ARTICLE = value[0].article_bg;
      this.languages.en.VARNA_HEADER = value[0].header_en;
      this.languages.en.VARNA_ARTICLE = value[0].article_en;
      this.languages.ru.VARNA_HEADER = value[0].header_ru;
      this.languages.ru.VARNA_ARTICLE = value[0].article_ru;
    });
  }

  getRegions() {
    this.languages.bg.REGIONS = [];
    this.languages.en.REGIONS = [];
    this.languages.ru.REGIONS = [];
    this.baseHttp.getArticle('region').subscribe((val: Array<IArticle>) => {
      val.forEach((region: IArticle) => {
        this.languages.bg.REGIONS.push({
          header: region.header_bg,
          article: region.article_bg
        });
        this.languages.en.REGIONS.push({
          header: region.header_en,
          article: region.article_en
        });
        this.languages.ru.REGIONS.push({
          header: region.header_ru,
          article: region.article_ru
        });
      });
    });
  }

  getHowTo() {
    this.languages.bg.HOW_TO_ARTICLES = [];
    this.languages.en.HOW_TO_ARTICLES = [];
    this.languages.ru.HOW_TO_ARTICLES = [];

    this.baseHttp.getArticle('howTo').subscribe((val: Array<IArticle>) => {
      val.forEach((howToArticle: IArticle) => {
        this.languages.bg.HOW_TO_ARTICLES.push({
          header: howToArticle.header_bg,
          article: howToArticle.article_bg
        });
        this.languages.en.HOW_TO_ARTICLES.push({
          header: howToArticle.header_en,
          article: howToArticle.article_en
        });
        this.languages.ru.HOW_TO_ARTICLES.push({
          header: howToArticle.header_ru,
          article: howToArticle.article_ru
        });
      });
    });
  }

  getHistory() {
    this.baseHttp.getArticle('companyHistory').subscribe((val: IArticle) => {
      this.languages.bg.HISTORY_HEADER = val[0].header_bg;
      this.languages.bg.HISTORY_ARTICLE = val[0].article_bg;
      this.languages.en.HISTORY_HEADER = val[0].header_en;
      this.languages.en.HISTORY_ARTICLE = val[0].article_en;
      this.languages.ru.HISTORY_HEADER = val[0].header_ru;
      this.languages.ru.HISTORY_ARTICLE = val[0].article_ru;
    });
  }

  getPrinciples() {
    this.baseHttp.getArticle('companyPrinciples').subscribe((val: IArticle) => {
      this.languages.bg.PRINCIPLES_HEADER = val[0].header_bg;
      this.languages.bg.PRINCIPLES_ARTICLE = val[0].article_bg;
      this.languages.en.PRINCIPLES_HEADER = val[0].header_en;
      this.languages.en.PRINCIPLES_ARTICLE = val[0].article_en;
      this.languages.ru.PRINCIPLES_HEADER = val[0].header_ru;
      this.languages.ru.PRINCIPLES_ARTICLE = val[0].article_ru;
    });
  }

  private getLanguage(key: string) {
    return this.http.get<ILanguage>('./assets/i18n/' + key + '.json');
  }

  private navigateTo(key: string) {
    const valueToReplace = this.router.url.substring(1, 3);
    this.router.navigateByUrl(this.router.url.replace(valueToReplace, key));
  }
}
