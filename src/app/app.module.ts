import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { NodesComponent }      from './nodes.component';
import { NodeDetailComponent }  from './node-detail.component';
import { NodeService }          from './node.service';
import { NodeSearchComponent }  from './node-search.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NodeDetailComponent,
    NodesComponent,
    NodeSearchComponent
  ],
  providers: [ NodeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
