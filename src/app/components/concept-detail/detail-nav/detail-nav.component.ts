import { Component, OnInit } from '@angular/core';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
    selector: 'app-detail-nav',
    templateUrl: './detail-nav.component.html'
})
export class DetailNavComponent {
    public concept = null;
    public refSetLanguage = {
        conceptId: '450828004',
        preferredTerm: ' conjunto de referencias de lenguaje castellano para América Latina (metadato fundacional)'
    };
    public conceptSelect$;

    constructor(private conceptDetailService: ConceptDetailService) {
        this.conceptSelect$ = this.conceptDetailService.conceptSelected$;
    }

}
