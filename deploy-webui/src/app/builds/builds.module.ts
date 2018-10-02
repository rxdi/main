import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildsRoutingModule } from './builds-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    BuildsRoutingModule
  ],
  declarations: [ListComponent, DetailsComponent]
})
export class BuildsModule { }
