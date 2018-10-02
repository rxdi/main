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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
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
