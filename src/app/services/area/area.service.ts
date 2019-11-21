import { Injectable } from '@angular/core';
import { TranslatableString } from '../../models/TranslatableString';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

import { Article } from '../../models/Article';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  areasUrl = 'src/Lib/App/Temp/mock-options.json';
  areasNames: TranslatableString[];
  currentApiUrl = '/api/region/region';

  areas: { name: string; id: string; offers: number; isSelected: boolean }[] = [
    { name: 'м-т Ракитника', id: '001', offers: 0, isSelected: false },
    { name: 'м-т Фичоза', id: '002', offers: 0, isSelected: false },
    { name: 'м-т Боровец - юг', id: '003', offers: 0, isSelected: false },
    { name: 'м-т Прибой', id: '004', offers: 0, isSelected: false },
    { name: 'Парк Боровец', id: '005', offers: -1, isSelected: false },
    { name: 'м-т Боровец - север', id: '006', offers: 0, isSelected: false },
    { name: 'Галата', id: '007', offers: 0, isSelected: false },
    { name: 'м-т Зеленика', id: '008', offers: 0, isSelected: false },
    { name: 'Аспарухово', id: '009', offers: 0, isSelected: false },
    { name: 'Аспарухов парк', id: '010', offers: -1, isSelected: false },
    {
      name: 'Островна промишлена зона',
      id: '011',
      offers: 0,
      isSelected: false
    },
    { name: 'Пристанище Варна', id: '012', offers: 0, isSelected: false },
    {
      name: 'Корабостроителница Варна',
      id: '013',
      offers: 0,
      isSelected: false
    },
    { name: 'Гаров район', id: '014', offers: 0, isSelected: false },
    { name: 'Гръцка махала', id: '015', offers: 0, isSelected: false },
    { name: 'ЖП Гара', id: '016', offers: 0, isSelected: false },
    { name: 'Приморски парк', id: '017', offers: -1, isSelected: false },
    { name: 'Операта', id: '018', offers: 0, isSelected: false },
    { name: 'Електроразпр. Варна', id: '019', offers: 0, isSelected: false },
    { name: 'Бизнес хотел', id: '020', offers: 0, isSelected: false },
    { name: 'Център', id: '021', offers: 0, isSelected: false },
    { name: 'Погреби', id: '022', offers: 0, isSelected: false },
    {
      name: "Проект 'Пристанище Варна'",
      id: '023',
      offers: 0,
      isSelected: false
    },
    { name: 'Централна поща', id: '024', offers: 0, isSelected: false },
    { name: 'Христо Ботев', id: '025', offers: 0, isSelected: false },
    { name: 'Колхозен пазар', id: '026', offers: 0, isSelected: false },
    { name: 'Образцов дом', id: '027', offers: 0, isSelected: false },
    { name: 'Общината', id: '028', offers: 0, isSelected: false },
    { name: 'ВИНС', id: '029', offers: 0, isSelected: false },
    { name: 'Нептун', id: '030', offers: 0, isSelected: false },
    { name: 'Максуда', id: '031', offers: 0, isSelected: false },
    { name: 'Червен площад', id: '032', offers: 0, isSelected: false },
    { name: 'Зимно кино Тракия', id: '033', offers: 0, isSelected: false },
    { name: 'Спортна зала', id: '034', offers: 0, isSelected: false },
    {
      name: 'Западна промишлена зона',
      id: '035',
      offers: 0,
      isSelected: false
    },
    { name: 'Генералите', id: '036', offers: 0, isSelected: false },
    { name: 'Морска градина', id: '037', offers: 0, isSelected: false },
    { name: 'Чаталджа', id: '038', offers: 0, isSelected: false },
    { name: 'Военноморско училище', id: '039', offers: -1, isSelected: false },
    { name: 'Окръжна болница', id: '040', offers: 0, isSelected: false },
    { name: 'Лятно кино Тракия', id: '041', offers: -1, isSelected: false },
    { name: 'Стадион Черно Море', id: '042', offers: -1, isSelected: false },
    { name: 'Чайка', id: '043', offers: 0, isSelected: false },
    { name: 'Автогара', id: '044', offers: 0, isSelected: false },
    { name: 'Завод Дружба', id: '045', offers: 0, isSelected: false },
    { name: 'Паметника', id: '046', offers: -1, isSelected: false },
    { name: 'ХЕИ', id: '047', offers: 0, isSelected: false },
    { name: 'Бриз', id: '048', offers: 0, isSelected: false },
    { name: 'Гранд Мол Варна', id: '049', offers: 0, isSelected: false },
    { name: 'Гробищен парк', id: '050', offers: -1, isSelected: false },
    { name: 'Електрон', id: '051', offers: 0, isSelected: false },
    { name: 'Стадион Спартак', id: '052', offers: -1, isSelected: false },
    { name: 'Двореца Евксиноград', id: '053', offers: -1, isSelected: false },
    { name: 'Базар Левски', id: '054', offers: 0, isSelected: false },
    { name: 'Трошево', id: '055', offers: 0, isSelected: false },
    { name: 'Конфуто', id: '056', offers: 0, isSelected: false },
    { name: 'м-т Св. Никола', id: '057', offers: 0, isSelected: false },
    { name: 'м-т Евксиноград', id: '058', offers: 0, isSelected: false },
    { name: 'Стадион Варна', id: '059', offers: -1, isSelected: false },
    { name: 'Циркова площадка', id: '060', offers: -1, isSelected: false },
    { name: 'Цветен квартал', id: '061', offers: 0, isSelected: false },
    { name: 'Левски', id: '062', offers: 0, isSelected: false },
    { name: 'В И К', id: '063', offers: -1, isSelected: false },
    {
      name: 'Северна промишлена зона',
      id: '064',
      offers: 0,
      isSelected: false
    },
    { name: 'м-т Траката', id: '065', offers: 0, isSelected: false },
    { name: 'Победа', id: '066', offers: 0, isSelected: false },
    {
      name: 'Парк Владислав Варненчик',
      id: '067',
      offers: -1,
      isSelected: false
    },
    { name: 'м-т Сотира', id: '068', offers: 0, isSelected: false },
    { name: 'Терапевтична болница', id: '069', offers: 0, isSelected: false },
    { name: 'м-т Акчелар', id: '070', offers: 0, isSelected: false },
    { name: 'Младост 1', id: '071', offers: 0, isSelected: false },
    { name: 'Бизнес парк Варна', id: '072', offers: 0, isSelected: false },
    { name: 'Изгрев', id: '073', offers: 0, isSelected: false },
    { name: 'м-т Пчелина', id: '074', offers: 0, isSelected: false },
    { name: 'Военна болница', id: '075', offers: 0, isSelected: false },
    { name: 'м-т Франга Дере', id: '076', offers: 0, isSelected: false },
    { name: 'м-т Кокарджа', id: '077', offers: 0, isSelected: false },
    { name: 'Летище', id: '078', offers: 0, isSelected: false },
    { name: 'Парк Младост', id: '079', offers: -1, isSelected: false },
    { name: 'Метро', id: '080', offers: 0, isSelected: false },
    { name: 'Младост 2', id: '081', offers: 0, isSelected: false },
    { name: 'Възраждане 3', id: '082', offers: 0, isSelected: false },
    {
      name: 'Планова промишлена зона',
      id: '083',
      offers: 0,
      isSelected: false
    },
    { name: 'м-т Атанас Тарла', id: '084', offers: 0, isSelected: false },
    { name: 'Възраждане 2', id: '085', offers: 0, isSelected: false },
    { name: 'Кайсиева градина', id: '086', offers: 0, isSelected: false },
    { name: 'Възраждане 1', id: '087', offers: 0, isSelected: false },
    { name: 'м-т Боклук Тарла', id: '088', offers: 0, isSelected: false },
    { name: 'м-т Сълзица', id: '089', offers: 0, isSelected: false },
    { name: 'Възраждане 4', id: '090', offers: 0, isSelected: false },
    { name: 'Владислав Варненчик', id: '091', offers: 0, isSelected: false },
    { name: 'м-т Кочмар', id: '092', offers: 0, isSelected: false },
    { name: 'Виница', id: '093', offers: 0, isSelected: false },
    { name: 'м-т Ментешето', id: '094', offers: 0, isSelected: false },
    { name: 'м-т Планова', id: '095', offers: 0, isSelected: false },
    { name: 'м-т Балам Дере', id: '096', offers: 0, isSelected: false }
  ];
  areasArticles: Article[];
  selectedArea: Article;

  constructor(private router: Router, private http: HttpClient) {
    this.areasNames = [];
    const localMapAreas = localStorage.getItem('map_areas');
    if (localMapAreas) {
      this.areas = JSON.parse(localMapAreas);
    }
    this.getAreasNames();
    console.log(this.areasNames.length);
    setTimeout(() => {
      console.log(this.areasNames[0]);
    }, 2000);
  }

  getAreaName(areaNameBg: string): string {
    const a = this.areasNames.find(area => area.valueBg === areaNameBg);
    if (a) {
      return this.areasNames
        .find(area => area.valueBg === areaNameBg)
        .getValue();
    }
  }

  getAreasNames() {
    const httpOptions = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
    this.http
      .get(AppComponent.mainUrl + this.currentApiUrl, { headers: httpOptions })
      .subscribe(
        (
          data: Array<{
            name: string;
            name_en: string;
            name_bg: string;
            name_ru: string;
          }>
        ) => {
          for (let i = 0; i < data.length; i++) {
            this.areasNames[i] = new TranslatableString(
              data[i].name,
              data[i].name_en,
              data[i].name_bg,
              data[i].name_ru
            );

            if (!this.areas.find(area => area.name === data[i].name_bg)) {
              this.areas.push({
                name: data[i].name_bg,
                id: (this.areas.length + 1).toString(),
                offers: 0,
                isSelected: false
              });
            }
          }
        },
        err => {
          window.alert('404_NOT_FOUND');
        }
      );
  }

  translateAreaName(areaName: string): string {
    return this.areasNames.find(area => area.valueBg === areaName).getValue();
  }

  clickArea(id: string) {
    const area = this.areas.find(a => a.id === id);
    area.isSelected = !area.isSelected;
  }

  public hasOffers(id: string): number {
    // if (this.areas.find((area) => area.id === id)) {
    return this.areas.find(area => area.id === id).offers;
    // }
    // return 0;
  }

  public isSelected(id: string): boolean {
    // if (this.areas.find((area) => area.id === id)) {
    return this.areas.find(area => area.id === id).isSelected;
    // }
    // return false;
  }

  resetSelectedAreas(): void {
    this.areas.forEach(area => {
      area.isSelected = false;
    });
  }

  public isCurrentSelected(id: string, selectedOfferArea: string): boolean {
    // if (this.areas.find((area) => area.id === id)) {
    return this.areas.find(area => area.id === id).name === selectedOfferArea;
    // }
    // return false;
  }
}
