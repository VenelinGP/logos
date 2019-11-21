import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavBarComponent } from './shared/components/side-nav-bar/side-nav-bar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavBarService } from './services/nav-bar/nav-bar.service';
import { LanguageService } from './services/languages/language.service';
import { HttpClientModule } from '@angular/common/http';

import { AboutModule } from './modules/about/about.module';
import { HomeModule } from './modules/home/home.module';

import { ContactsModule } from './modules/contacts/contacts.module';
import { HelpfulModule } from './modules/helpful/helpful.module';
import { EstatesModule } from './modules/estates/estates.module';
import { NewsModule } from './modules/news/news.module';
import { SafePipe } from './shared/pipes/safe/safe-pape';

import { TranslateService } from './shared/pipes/translate/translate.service';
import { ServicesComponent } from './modules/services/services/services.component';
import { TranslateModule } from './shared/pipes/translate/translate.module';

// tslint:disable-next-line: ban-types
export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('bg');
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    HeaderComponent,
    SafePipe,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    HomeModule,
    EstatesModule,
    NewsModule,
    HelpfulModule,
    ContactsModule,
    AboutModule
  ],
  providers: [
    NavBarService,
    LanguageService,
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
