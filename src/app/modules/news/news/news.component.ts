import {Component, OnInit} from '@angular/core';
import {NavBarService} from '../../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private nav: NavBarService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nav.deselectAll();
      this.nav.newsSelected = true;
    }, 0);

  }
}
