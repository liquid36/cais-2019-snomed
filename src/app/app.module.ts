import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkTreeModule } from '@angular/cdk/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';

import { Server } from './services/server.service';
import { SnomedAPI } from './services/snomed.service';

import { NavBusquedaComponent } from './components/nav-busqueda.component';

import { ConceptDetailService } from './components/concept-detail/concept-detail.service';
import { ConceptDetailComponent } from './components/concept-detail/concept-detail.component';
import { SummaryNavComponent } from './components/concept-detail/summary-nav/summary-nav.component';
import { ConceptNameComponent } from './elements/concept-name.component';
import { ConceptParentComponent } from './elements/concept-parent.component';
import { ConceptChildrenComponent } from './elements/concept-children.component';
import { TaxonomyNavComponent } from './components/taxonomy-nav/taxonomy-nav.component';
import { DetailNavComponent } from './components/concept-detail/detail-nav/detail-nav.component';
import { ConceptRelTableComponent } from './elements/concept-rel-table.component';
import { ConceptDescTableComponent } from './elements/concept-desc-table.component';
import { RefsetNavComponent } from './components/concept-detail/refset-nav/refset-nav.component';
import { ExpresssionConstraintNavComponent } from './components/expression-constraint/expression-constraint-nav.component';
import { ValueBindingComponent } from './components/value-binding/value-binding.component';
import { GraphNavComponent } from './components/concept-detail/graph-nav/graph-nav.component';
import { CircleNodeComponent } from './elements/graph/circle-node.svg';
import { ConnectElementComponent } from './elements/graph/connect-element.svg';
import { SctBoxComponent } from './elements/graph/sct-box.svg';
import { TODOSnomedAPI } from './services/todo.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBusquedaComponent,
    ConceptDetailComponent,
    SummaryNavComponent,
    TaxonomyNavComponent,
    ConceptNameComponent,
    ConceptParentComponent,
    ConceptChildrenComponent,
    DetailNavComponent,
    ConceptRelTableComponent,
    ConceptDescTableComponent,
    RefsetNavComponent,
    ExpresssionConstraintNavComponent,
    ValueBindingComponent,
    GraphNavComponent,
    CircleNodeComponent,
    ConnectElementComponent,
    SctBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AngularSplitModule,
    CdkTreeModule
  ],
  providers: [
    Server,
    // SnomedAPI,
    { provide: SnomedAPI, useClass: TODOSnomedAPI },
    ConceptDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
