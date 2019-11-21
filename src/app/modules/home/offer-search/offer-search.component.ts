import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../../services/base-http/base-http.service';
import { TranslatableString } from '../../../models/TranslatableString';

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.scss']
})
export class OfferSearchComponent implements OnInit {
  // this is a dictionary which holds the type and its value ( selected or not )
  inputRespond: { errorName: string; message: string };

  lowestValidSellablePriceMin = 0;
  highestValidSellablePriceMax = 1000000000;
  lowestValidRentablePriceMin = 0;
  highestValidRentablePriceMax = 1000000000;
  lowestValidSpaceMin = 0;
  highestValidSpaceMax = 1000000000;
  propertyTypes: {
    key: TranslatableString;
    subtypes: { key: TranslatableString; value: boolean }[];
  }[];
  selectedType: {
    key: TranslatableString;
    subtypes: { key: TranslatableString; value: boolean }[];
  };
  priceFrom: string;
  priceTo: string;
  spaceFrom: string;
  spaceTo: string;
  searchId: string;

  currentOfferType: string;
  constructor(public httpService: BaseHttpService) {
    this.propertyTypes = [];
    this.getPropertySubTypes();
    this.currentOfferType = 'sellable';
  }

  ngOnInit() {}

  resetSearchOptions(): void {
    this.propertyTypes.forEach(propertyType => {
      propertyType.subtypes.forEach(subType => {
        subType.value = false;
      });
    });
    this.priceFrom = '';
    this.priceTo = '';
    this.spaceFrom = '';
    this.spaceTo = '';
    this.searchId = '';

    // this.areaService.resetSelectedAreas();
  }

  clickSearchOffers(
    id: string = '',
    priceMin: string = '',
    priceMax: string = '',
    spaceMin: string = '',
    spaceMax: string = ''
  ) {
    // Catch bad input
    this.handleSearchOptionInput(id, priceMin, priceMax, spaceMin, spaceMax);

    if (this.inputRespond.errorName === 'None') {
      // OnSuccesss
      // this.httpService.searchOffer(id, priceMin, priceMax, spaceMin, spaceMax);
    } else {
      // DISPLAY ERROR
      console.log(this.inputRespond.errorName);
    }
  }

  private handleSearchOptionInput(
    id: string,
    priceMin: string,
    priceMax: string,
    spaceMin: string,
    spaceMax: string
  ): void {
    this.inputRespond = { errorName: 'None', message: '' };

    this.handleSearchOptionBadInput(id, priceMin, priceMax, spaceMin, spaceMax);

    if (this.inputRespond.errorName === 'BadInput') {
      return;
    }
    if (this.currentOfferType === 'sellable') {
      this.handleSearchOptionSellable(priceMin, priceMax);
      return;
    } else if (this.currentOfferType === 'rentable') {
      this.handleSearchOptionRentable(priceMin, priceMax);
      return;
    }

    if (
      Number(spaceMin) < this.lowestValidSpaceMin ||
      Number(spaceMin) > this.highestValidSpaceMax
    ) {
      this.inputRespond.errorName = 'InvalidSpace';
      this.inputRespond.message =
        'INVALID SPACE REQUEST! The minumum space should be between ' +
        this.lowestValidSpaceMin +
        ' and ' +
        this.highestValidSpaceMax +
        ' .';
    } else if (Number(spaceMin) > Number(spaceMax)) {
      this.inputRespond.errorName = 'InvalidSpace';
      this.inputRespond.message =
        'INVALID SPACE REQUEST! The minumum space should not be bigger than the maximum space.';
    } else if (
      Number(spaceMax) > this.highestValidSpaceMax ||
      Number(spaceMax) < this.lowestValidSpaceMin
    ) {
      this.inputRespond.errorName = 'InvalidSpace';
      this.inputRespond.message =
        'INVALID SPACE REQUEST! The maximum space should be between ' +
        this.lowestValidSpaceMin +
        ' and ' +
        this.highestValidSpaceMax +
        ' .';
    }
  }

  private handleSearchOptionSellable(priceMin: string, priceMax: string) {
    if (
      Number(priceMin) < this.lowestValidSellablePriceMin ||
      Number(priceMin) > this.highestValidSellablePriceMax
    ) {
      this.inputRespond.errorName = 'InvalidPrice';
      this.inputRespond.message =
        'INVALID PRICE REQUEST! The minumum price for buying should be between ' +
        this.lowestValidSellablePriceMin +
        ' and ' +
        this.highestValidSellablePriceMax +
        ' .';
    } else if (Number(priceMin) > Number(priceMax)) {
      this.inputRespond.errorName = 'InvalidPrice';
      this.inputRespond.message =
        'INVALID PRICE REQUEST! The minumum price for buying should not be bigger than the maximum price.';
    } else if (
      Number(priceMax) > this.highestValidSpaceMax ||
      Number(priceMax) < this.lowestValidSellablePriceMin
    ) {
      this.inputRespond.errorName = 'InvalidPrice';
      this.inputRespond.message =
        'INVALID PRICE REQUEST! The maximum price for buying should be between ' +
        this.lowestValidSellablePriceMin +
        ' and ' +
        this.highestValidSellablePriceMax +
        ' .';
    }
  }

  private handleSearchOptionRentable(priceMin: string, priceMax: string) {
    if (
      Number(priceMin) < this.lowestValidRentablePriceMin ||
      Number(priceMin) > this.highestValidRentablePriceMax
    ) {
      this.inputRespond.errorName = 'InvalidPrice';
      this.inputRespond.message =
        'INVALID PRICE REQUEST! The minumum price for renting should be between ' +
        this.lowestValidRentablePriceMin +
        ' and ' +
        this.highestValidRentablePriceMax +
        ' .';
    } else if (Number(priceMin) > Number(priceMax)) {
      this.inputRespond.errorName = 'InvalidPrice';
      this.inputRespond.message =
        'INVALID PRICE REQUEST! The minumum price for renting should not be bigger than the maximum price.';
    } else if (
      Number(priceMax) > this.highestValidSpaceMax ||
      Number(priceMax) < this.lowestValidRentablePriceMin
    ) {
      this.inputRespond.errorName = 'InvalidPrice';
      this.inputRespond.message =
        'INVALID PRICE REQUEST! The maximum price for renting should be between ' +
        this.lowestValidRentablePriceMin +
        ' and ' +
        this.highestValidRentablePriceMax +
        ' .';
    }
  }

  private handleSearchOptionBadInput(
    id: string,
    priceMin: string,
    priceMax: string,
    spaceMin: string,
    spaceMax: string
  ): void {
    if (!this.isInputValidNumberOrEmpty(id)) {
      this.inputRespond.errorName = 'BadInput';
      this.inputRespond.message =
        'INVALID INPUT! The offer id can contain numbers only.';
    } else if (!this.isInputValidNumberOrEmpty(priceMin)) {
      this.inputRespond.errorName = 'BadInput';
      this.inputRespond.message =
        'INVALID INPUT! The offer minimum price can contain numbers only.';
    } else if (!this.isInputValidNumberOrEmpty(priceMax)) {
      this.inputRespond.errorName = 'BadInput';
      this.inputRespond.message =
        'INVALID INPUT! The offer maximum price can contain numbers only.';
    } else if (!this.isInputValidNumberOrEmpty(spaceMin)) {
      this.inputRespond.errorName = 'BadInput';
      this.inputRespond.message =
        'INVALID INPUT! The offer minimun space can contain numbers only.';
    } else if (!this.isInputValidNumberOrEmpty(spaceMax)) {
      this.inputRespond.errorName = 'BadInput';
      this.inputRespond.message =
        'INVALID INPUT! The offer maximum space can contain numbers only.';
    }
  }

  private getPropertySubTypes(): void {
    this.httpService.getPropertySubtypes().subscribe(data => {
      this.propertyTypes = [];
      data.forEach(el => {
        const translatableType = new TranslatableString(
          el.type.type,
          el.type.type_en,
          el.type.type_bg,
          el.type.type_ru
        );
        const translatableSubType = new TranslatableString(
          el.subtype,
          el.subtype_en,
          el.subtype_bg,
          el.subtype_ru
        );

        const tempType = this.propertyTypes.find(
          type => type.key.valueBg === el.type.type_bg
        );

        if (tempType) {
          tempType.subtypes.push({ key: translatableSubType, value: false });
        } else {
          this.propertyTypes.push({
            key: translatableType,
            subtypes: [{ key: translatableSubType, value: false }]
          });
        }
      });
      this.selectedType = this.propertyTypes[0];
      console.log(this.propertyTypes);
    });
  }

  clickPropertyType(propertyType: {
    key: TranslatableString;
    subtypes: { key: TranslatableString; value: boolean }[];
  }): void {
    this.selectedType = propertyType;
  }

  clickPropertySubtype(subtype: {
    key: TranslatableString;
    value: boolean;
  }): void {
    subtype.value = !subtype.value;
  }
  changeOfferType(offertype: string): void {
    this.currentOfferType = offertype;
  }

  private isInputValidNumberOrEmpty(input: string): boolean {
    return input === '' || /^[0-9]+$/.test(input);
  }

  isAnyPropertySubtypeSelected(propertyType: {
    key: TranslatableString;
    subtypes: { key: TranslatableString; value: boolean }[];
  }): boolean {
    return (
      propertyType.subtypes.filter(subtype => subtype.value === true).length > 0
    );
  }

  handleNumericInput(e): boolean {
    const allowedKeys = [
      46, // Key.Delete,
      8, // Key.Backspace,
      9, // Key.Tab,
      27, // Key.Escape,
      13, // Key.Enter,
      36, // Key.Home,
      35, // Key.End,
      37, // Key.LeftArrow,
      39 // Key.RightArrow
    ];
    if (
      allowedKeys.indexOf(e.charCode) !== -1 ||
      // Allow: Ctrl+A
      (e.charCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.charCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.charCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.charCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.charCode >= 35 && e.charCode <= 39)
    ) {
      // let it happen, don't do anything
      return true;
    }
    if (!/[\d]/g.test(e.key)) {
      e.preventDefault();
      return false;
    }
  }
}
