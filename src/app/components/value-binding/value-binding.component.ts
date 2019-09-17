import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-value-binding',
    templateUrl: './value-binding.component.html'
})
export class ValueBindingComponent {


    constructor(private snomed: SnomedAPI) {
    }

    public model = [
        {
            label: 'Lateralidad 2',
            elementType: 'typeahead',
            attribute: '272741003'
        },
        {
            label: 'Lateralidad',
            elementType: 'typeahead',
            query: '24028007 OR 7771000 OR 51440002',
            items: [
                {
                    conceptId: '24028007',
                    effectiveTime: '20020131',
                    moduleId: '900000000000207008',
                    active: true,
                    fsn: {
                        term: 'Right (qualifier value)',
                        lang: 'en'
                    },
                    pt: {
                        term: 'Right',
                        lang: 'en'
                    },
                    definitionStatus: 'PRIMITIVE',
                    id: '24028007'
                },
                {
                    conceptId: '7771000',
                    effectiveTime: '20020131',
                    moduleId: '900000000000207008',
                    active: true,
                    fsn: {
                        term: 'Left (qualifier value)',
                        lang: 'en'
                    },
                    pt: {
                        term: 'Left',
                        lang: 'en'
                    },
                    definitionStatus: 'PRIMITIVE',
                    id: '7771000'
                },
                {
                    conceptId: '51440002',
                    effectiveTime: '20020131',
                    moduleId: '900000000000207008',
                    active: true,
                    fsn: {
                        term: 'Right and left (qualifier value)',
                        lang: 'en'
                    },
                    pt: {
                        term: 'Right and left',
                        lang: 'en'
                    },
                    definitionStatus: 'PRIMITIVE',
                    id: '51440002'
                }
            ]
        }
    ];

    public serching = {};

    expression = '';

    formatter = (x: any) => {
        return x.pt.term;
    }


    search(item) {
        if (this.serching[item.label]) {
            return this.serching[item.label];
        } else {
            this.serching[item.label] = (text$: Observable<string>) =>
                text$.pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(term => {
                        if (item.query) {
                            return this.snomed.query(item.query, term).pipe(
                                catchError(() => {
                                    return of({ items: [] });
                                }));
                        } else if (item.attribute) {
                            return this.snomed.mrcm(item.attribute, term);
                        }

                    }
                    ),
                    map(res => res.items)
                );
            return this.serching[item.label];
        }


    }
    postcordinate() {
        let postcordinate = '';
        this.model.forEach((item: any) => {
            postcordinate += item.attribute + ' = ' + item.value.conceptId + ',';
        });
        this.expression = '* : {' + postcordinate.substr(0, postcordinate.length - 1) + '}';


    }

}
