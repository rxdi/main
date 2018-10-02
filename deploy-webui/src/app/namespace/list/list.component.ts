import { Component, OnInit } from '@angular/core';
import { NamespaceService } from '../../core/services/namespace/namespace.service';
import { INamespacetype, INamespaceListType } from '../../core/api-introspection';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  namespaces: Observable<INamespaceListType>
  constructor(
    private namespaceService: NamespaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.namespaces = this.namespaceService.listNamespace();
  }

  goToDetails(id: string) {
    this.router.navigate([`/namespace/details/${id}`])
  }

}
