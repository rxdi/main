import { Component, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NewPostGQL } from './test';
import { ServerService } from './core/services/server/server.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators/index';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BackService } from './core/services/back.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deploy-webui';
  test;
  items: any[] = [
    {label: 'Light', value: true},
    {label: 'Console', value: false},
    {label: 'T.V.', value: true}];
  stream: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(
      private apollo: Apollo,
      private post: NewPostGQL,
      private se: ServerService,
      private router: Router,
      private location: Location,
      public backService: BackService
  ) {
    // this.apollo.query({
    //   query: gql`
    //     query findUser($message:String!) {
    //       findUser(message:$message) {
    //         message
    //       }
    //     }
    //   `,
    //   variables: {
    //     message: "1"
    //   }
    // }).subscribe(stream => {
    //   debugger
    // });

    this.test = this.post.subscribe();
    this.apollo.subscribe({
      query: gql`
      subscription subscribeToUserMessagesBasic {
        subscribeToUserMessagesBasic {
          message
        }
      }
      `
    })
    .pipe(
      map((res) => res.data.subscribeToUserMessagesBasic)
    )
    .subscribe(s => {
      this.stream.next([...this.stream.getValue(), s]);
    });

  }

  goTo(link: string) {
    this.backService.hideArrow();
    this.router.navigate([link]);
  }

  back() {
    this.location.back();
    this.backService.hideArrow();
  }

}
