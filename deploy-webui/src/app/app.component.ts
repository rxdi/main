import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
      private apollo: Apollo
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
    })
  }
  title = 'deploy-webui';
}
