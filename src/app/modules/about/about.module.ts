import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { PrinciplesComponent } from './principles/principles.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [HistoryComponent, PrinciplesComponent, TeamComponent],
  imports: [
    CommonModule
  ],
  exports: [HistoryComponent, PrinciplesComponent, TeamComponent]
})
export class AboutModule { }
