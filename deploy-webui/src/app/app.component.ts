import { Component, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NewPostGQL } from './test';
import { ServerService } from './core/services/server/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deploy-webui';
  showFiller = false;
  test;
  constructor(
      private apollo: Apollo,
      private post: NewPostGQL,
      private se: ServerService
  ) {
    this.apollo.query({
      query: gql(`
        query findUser($id:String!) {
          findUser(id:$id) {
            id
          }
        }
      `),
      variables: {
        id: "1"
      }
    }).subscribe(stream => {
      debugger
    });

    this.test = this.post.subscribe();
    this.apollo.subscribe({
      query: gql(`
      subscription subscribeToUserMessagesBasic {
        subscribeToUserMessagesBasic {
          id
        }
      }
      `),
      variables: {
        id: "1"
      }
    }).subscribe(stream => {
      debugger
    });

  }

}
