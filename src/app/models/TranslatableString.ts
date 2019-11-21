import { AppComponent } from '../app.component';

export class TranslatableString {
  value: string;
  valueEn: string;
  valueBg: string;
  valueRu: string;

  constructor(
    value?: string,
    valueEn?: string,
    valueBg?: string,
    valueRu?: string
  ) {
    this.value = value || '';
    this.valueEn = valueEn || '';
    this.valueBg = valueBg || '';
    this.valueRu = valueRu || '';
  }

  getValue(): string {
    if (AppComponent.language === 'en') {
      return this.valueEn;
    } else if (AppComponent.language === 'bg') {
      return this.valueBg;
    } else if (AppComponent.language === 'ru') {
      return this.valueRu;
    }
  }
}
