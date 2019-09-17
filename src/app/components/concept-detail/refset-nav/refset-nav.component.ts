import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail.service';
import { switchMap, tap, refCount, publishReplay } from 'rxjs/operators';

@Component({
    selector: 'app-refset-nav',
    templateUrl: './refset-nav.component.html',
})
export class RefsetNavComponent implements OnInit {
    public conceptSelected = null;
    public miembros$;
    public conceptos$ = {};

    constructor(
        public snomed: SnomedAPI,
        public conceptDetailService: ConceptDetailService
    ) { }

    ngOnInit() {
        this.miembros$ = this.conceptDetailService.conceptSelected$.pipe(
            tap(console.log),
            tap(concept => this.conceptSelected = concept),
            switchMap((concept) => {
                return this.snomed.refset(concept.conceptId);
            }),
            tap((results: any) => {
                results.items.forEach((sct) => {
                    this.conceptos$[sct.refsetId] = this.snomed.concept(sct.refsetId);
                });
            })
        );
    }
}
