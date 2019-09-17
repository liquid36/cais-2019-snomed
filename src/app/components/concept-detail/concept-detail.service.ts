
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnomedAPI } from '../../services/snomed.service';

@Injectable()
export class ConceptDetailService {

    private conceptSelected = new BehaviorSubject<any>(null);
    conceptSelected$ = this.conceptSelected.asObservable();

    constructor(private snomed: SnomedAPI) {

    }

    select(concept) {
        this.snomed.concept(concept.conceptId).subscribe((snomed) => {
            this.conceptSelected.next(snomed);
        });
    }

}
