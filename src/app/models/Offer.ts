import { TranslatableString } from './TranslatableString';

export class Offer {
  id: number; // Номер
  city: TranslatableString; // Варна
  area: TranslatableString; // Владиславово
  type: TranslatableString; // Апартамент
  subType: TranslatableString; // 1-стаен
  pictures: string[];
  likeCounter: number; // Харесвания
  space: number; // Площ
  price: string; // Цена евро
  yardSpace: number;
  isAvailable: boolean;
  isSellable: boolean; // Продава се
  isRentable: boolean; // Дава се под наем
  isFurnished: boolean; // Обзаведен
  isRegulated: boolean; // В регулация
  isLuxury: boolean; // Луксозен имот
  isInComplex: boolean; // Жилищен комплекс
  yearOfBuilt: number; // Година на завършване
  floor: TranslatableString; // Етаж
  buildingType: TranslatableString; // Тип строителство
  description: TranslatableString; // Описание
  contactUserNameBg: string; // Име на лицето за контакт
  specifications: TranslatableString[];
  googleMapLink: string;
  youtubeLink: string;

  private static getSrcFromEmbedCode(rawCode: string): string {
    const tempStrArr = rawCode.split(' ');
    let srcStr = tempStrArr.find(subStr => subStr.startsWith('src="'));
    srcStr = srcStr.slice(5, srcStr.length - 1);
    return srcStr;
  }

  constructor(off: any) {
    this.id = off.property_id;
    const regionObj = off.property_region;
    this.area = new TranslatableString(
      regionObj.name,
      regionObj.name_en,
      regionObj.name_bg,
      regionObj.name_ru
    );
    const propTypeObj = off.property_type;
    this.type = new TranslatableString(
      propTypeObj.type,
      propTypeObj.type_en,
      propTypeObj.type_bg,
      propTypeObj.type_ru
    );
    const subTypeObj = off.property_subtype;
    this.subType = new TranslatableString(
      subTypeObj.subtype,
      subTypeObj.subtype_en,
      subTypeObj.subtype_bg,
      subTypeObj.subtype_ru
    );
    this.space = off.property_space;
    this.price = off.property_price;
    this.isSellable = off.property_for_sale;
    this.isRentable = off.property_for_rent;
    this.pictures = [];
    this.isAvailable = !off.property_sold;
    if (off.picture) {
      this.pictures.push(
        'http://api.logos.bg' + '/media' + off.picture.property_pictures
      );
    }

    const cityObj = off.property_city;
    if (cityObj) {
      this.city = new TranslatableString(
        cityObj.name,
        cityObj.name_en,
        cityObj.name_bg,
        cityObj.name_ru
      );
    }
    if (off.property_like_counter) {
      this.likeCounter = off.property_like_counter;
    } else {
      this.likeCounter = 0;
    }

    if (off.property_yard_space) {
      this.yardSpace = off.property_yard_space;
    }
    if (off.property_furnished) {
      this.isFurnished = off.property_furnished;
    }
    if (off.property_regulated) {
      this.isRegulated = off.property_regulated;
    }
    if (off.luxury_property) {
      this.isLuxury = off.luxury_property;
    }
    if (off.property_complex) {
      this.isInComplex = off.property_complex;
    }
    if (off.property_year_built) {
      this.yearOfBuilt = off.property_year_built;
    }
    if (off.property_floor) {
      this.floor = new TranslatableString(
        off.property_floor,
        off.property_floor_en,
        off.property_floor_bg,
        off.property_floor_ru
      );
    }
    if (off.property_building_type) {
      this.buildingType = new TranslatableString(
        off.property_building_type.building_type,
        off.property_building_type.building_type_en,
        off.property_building_type.building_type_bg,
        off.property_building_type.building_type_ru
      );
    }
    if (off.property_description) {
      this.description = new TranslatableString(
        off.property_description,
        off.property_description_en,
        off.property_description_bg,
        off.property_description_ru
      );
    }
    if (off.property_contact_user) {
      this.contactUserNameBg = off.property_contact_user.name_bg;
    }
    this.specifications = [];

    if (off.property_google_link) {
      this.googleMapLink = Offer.getSrcFromEmbedCode(off.property_google_link);
    }
    if (off.youtube_link) {
      this.youtubeLink = Offer.getSrcFromEmbedCode(off.youtube_link);
    }
  }

  getTranslatedSpecificationsString(): string {
    let result = '';
    for (let i = 0; i < this.specifications.length; i++) {
      if (i !== 0) {
        result += ', ';
      }
      result += this.specifications[i].getValue();
    }
    return result;
  }
}
