import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.scss']
})
export class RentsComponent implements OnInit {
  constructor(private nav: NavBarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.estatesSelected = true;
      this.nav.rentsSelected = true;
      console.log('ngOnInit');
      console.log('Estates: ' + this.nav.estatesSelected);
      console.log('Sales: ' + this.nav.salesSelected);
      console.log('Rents: ' + this.nav.rentsSelected);
    }, 0);
  }
}
