import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';
import { AreaService } from '../../../services/area/area.service';

@Component({
  selector: 'app-area-filter',
  templateUrl: './area-filter.component.html',
  styleUrls: ['./area-filter.component.scss']
})
export class AreaFilterComponent implements OnInit {
  areasList: {
    name: string;
    id: string;
    offers: number;
    isSelected: boolean;
  }[];
  constructor(private nav: NavBarService, public areaService: AreaService) {
    this.areasList = this.areaService.areas.filter(areas => areas.offers >= 0);
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.homeSelected = true;
    }, 0);
  }

  clickOnArea(id: string) {
    this.areaService.clickArea(id);
  }

  getSortedAreasByNames(): {
    name: string;
    id: string;
    offers: number;
    isSelected: boolean;
  }[] {
    return this.areasList.sort(this.sortByTranslatedName);
  }

  sortByTranslatedName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
}
