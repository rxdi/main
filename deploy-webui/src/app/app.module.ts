import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NewPostGQL } from './test';
import { CoreModule } from './core/core.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule
  ],
  providers: [
    NewPostGQL,
    {
      provide: 'EventSource',
      useValue: window['serverSource']
    },
    {
      provide: 'ServerConfig',
      useFactory: () => {
        let config;
        try {
          config = JSON.parse(localStorage.getItem('config'))
        } catch (e) {
          localStorage.clear();
          window.location.reload();
        }
        return config;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
