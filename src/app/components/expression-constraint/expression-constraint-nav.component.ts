import { Component, OnInit } from '@angular/core';
import { ConceptDetailService } from '../concept-detail/concept-detail.service';
import { SnomedAPI } from '../../services/snomed.service';

@Component({
    selector: 'app-expression-constraint',
    templateUrl: './expression-constraint-nav.component.html'
})
export class ExpresssionConstraintNavComponent {
    public ecl = '';
    public term = '';
    public concepts = [];
    constructor(private conceptDetailService: ConceptDetailService, private snomed: SnomedAPI) {
    }

    execute() {
        this.snomed.query(this.ecl, this.term.length > 0 ? this.term : null).subscribe((result) => {
            this.concepts = result.items;
        });
    }
}
