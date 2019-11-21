import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';
import { LanguageService } from '../../../services/languages/language.service';
import { BaseHttpService } from '../../../services/base-http/base-http.service';
import { OfferService } from '../../../services/offer/offer.service';
import { Offer } from '../../../models/Offer';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  offersFilterVisible = false;
  offerRequestSent = false;
  maxMiddlePagesCount = 5;
  maxPages: number;
  middlePagesCount: number;
  middlePages: number[];
  maxOffersPerPage = 9;
  selectedFilteredPageIndex = 1;
  canShowLeftDots: boolean;
  canShowRightDots: boolean;
  filteredOffers: Offer[] = [];
  shownOffers: Offer[];

  public sortedByPrice = '';

  constructor(
    private nav: NavBarService,
    public httpService: BaseHttpService,
    public ls: LanguageService,
    public offerService: OfferService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.estatesSelected = true;
      this.nav.salesSelected = true;
    }, 0);
    this.whenOffersReady();
  }

  sortByPrice(sortPrice: string) {
    if (this.filteredOffers) {
      this.filteredOffers.sort((x, y) => {
        return sortPrice === 'ascending'
          ? Number(x.price.replace(' ', '')) - Number(y.price.replace(' ', ''))
          : Number(y.price.replace(' ', '')) - Number(x.price.replace(' ', ''));
      });
    }
    this.refreshPage();
  }
  sortBySpace(sortedSpace: string): void {
    if (this.filteredOffers) {
      this.filteredOffers.sort((x, y) => {
        return sortedSpace === 'ascending'
          ? x.space - y.space
          : y.space - x.space;
      });
    }
    this.refreshPage();
  }

  whenOffersReady() {
    if (this.filteredOffers.length > 0) {
      this.refreshPage();
      return this.filteredOffers;
    } else if (this.offerRequestSent) {
      setTimeout(() => {
        this.refreshPage();
        return this.filteredOffers;
      }, 500);
    } else {
      this.offerRequestSent = true;
      this.httpService.getOffers().subscribe(dataOferrs => {
        const filteredOffers = dataOferrs.filter(
          offer => offer.property_for_sale === true
        );
        for (let i = 0; i < filteredOffers.length; i++) {
          this.filteredOffers[i] = new Offer(filteredOffers[i]);
        }
        console.log(this.filteredOffers.length);
        this.updateShownOffers();
        this.refreshPage();
        return this.filteredOffers;
      });
    }
  }

  clickNextPage() {
    if (this.selectedFilteredPageIndex < this.maxPages) {
      this.selectedFilteredPageIndex++;
    }
    this.refreshPage();
  }
  clickPageIndex(index: number) {
    this.selectedFilteredPageIndex = index;
    this.refreshPage();
  }

  clickPreviousPage() {
    if (this.selectedFilteredPageIndex > 1) {
      this.selectedFilteredPageIndex--;
    }
    this.refreshPage();
  }

  public ClickFilterButton(): void {
    if (!this.offersFilterVisible) {
      this.showFilterMenu();
    } else {
      this.hideFilterMenu();
    }
  }

  public hideFilterMenu(): void {
    this.offersFilterVisible = false;
  }
  public showFilterMenu(): void {
    this.offersFilterVisible = true;
  }

  private updatePages() {
    this.maxPages = Math.floor(
      this.filteredOffers.length / this.maxOffersPerPage
    );
    if (this.filteredOffers.length % this.maxOffersPerPage !== 0) {
      this.maxPages++;
    }
    this.middlePagesCount =
      this.maxPages - 2 > this.maxMiddlePagesCount
        ? this.maxMiddlePagesCount
        : this.maxPages - 2;
    this.middlePages = [];
    for (let i = 0; i < this.middlePagesCount; i++) {
      this.middlePages.push(i + 2);
    }

    if (this.maxPages - 2 > this.maxMiddlePagesCount) {
      const pagesBeforeSelectedCount = Math.floor(
        (this.middlePagesCount - 1) / 2
      );
      this.canShowLeftDots =
        this.selectedFilteredPageIndex - pagesBeforeSelectedCount > 2;

      const pagesAfterSelectedCount = Math.floor(this.middlePagesCount / 2);

      this.canShowRightDots =
        this.selectedFilteredPageIndex + pagesAfterSelectedCount <
        this.maxPages - 1;

      if (!this.canShowLeftDots) {
        for (let i = 0; i < this.middlePagesCount; i++) {
          this.middlePages[i] = i + 2;
        }
      } else if (!this.canShowRightDots) {
        for (let i = 0; i < this.middlePagesCount; i++) {
          this.middlePages[i] = this.maxPages - (this.middlePagesCount - i);
        }
      } else {
        for (let i = 0; i < this.middlePagesCount; i++) {
          this.middlePages[i] =
            this.selectedFilteredPageIndex + (i - pagesBeforeSelectedCount);
        }
      }
    } else {
      this.canShowLeftDots = false;
      this.canShowRightDots = false;
    }
  }
  public refreshPage(): void {
    this.updatePages();
    this.updateShownOffers();
    // this.document.getElementsByClassName("logos-main-container")[0].scrollTop = 0;
  }
  private updateShownOffers(): void {
    const startIndex: number =
      (this.selectedFilteredPageIndex - 1) * this.maxOffersPerPage;
    const endIndex: number =
      this.selectedFilteredPageIndex * this.maxOffersPerPage;

    this.shownOffers = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < this.filteredOffers.length) {
        this.shownOffers.push(this.filteredOffers[i]);
      }
    }
  }
}
