import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
    selector: 'app-summary-nav',
    templateUrl: './summary-nav.component.html',
    //   styleUrls: ['./app.component.scss']
})
export class SummaryNavComponent implements OnInit {
    public conceptSelected = null;

    constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) { }

    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            if (concept) {
                this.conceptSelected = concept;
            }
        });
    }

}
