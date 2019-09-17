import { Component, OnInit, ElementRef } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';
import { ConceptDetailService } from './concept-detail/concept-detail.service';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators';

enum SearchMode {
    fullText,
    partialMatching,
    regex
}

enum StausFilter {
    activeOnly,
    inactiveOnly,
    activeAndInactive
}

@Component({
    selector: 'app-nav-busqueda',
    templateUrl: './nav-busqueda.component.html',
    //   styleUrls: ['./app.component.scss']
})
export class NavBusquedaComponent implements OnInit {
    public textSearch = '';
    private searchMode = 'partialMatching';
    private statusFilter = 'activeOnly';
    private semanticFilter = undefined;
    private results$: Observable<any>;

    constructor(
        private elementRef: ElementRef,
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) {
        this.results$ = fromEvent<Event>(this.elementRef.nativeElement, 'input').pipe(
            map($event => ($event.target as HTMLInputElement).value),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap((text) => {
                if (text.length > 2) {
                    return this.snomed.descriptions(this.textSearch);
                } else {
                    return of([]);
                }
            }),
            map(result => result.items)
        );

    }
    ngOnInit() {
    }

    onSelect(concept) {
        this.conceptDetailService.select(concept);
    }
}
