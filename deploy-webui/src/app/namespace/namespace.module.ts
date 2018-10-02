import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NamespaceRoutingModule } from './namespace-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    NamespaceRoutingModule,
    MatCardModule
  ],
  declarations: [ListComponent, DetailsComponent]
})
export class NamespaceModule { }
