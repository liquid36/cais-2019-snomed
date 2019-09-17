import { Component, Input, DebugElement } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';
import { ConceptDetailService } from '../components/concept-detail/concept-detail.service';

function sortTerm(a, b) {
    if (a.active && !b.active) {
        return -1;
    }
    if (!a.active && b.active) {
        return 1;
    }
    if (a.active === b.active) {
        if ((a.acceptable || a.preferred) && (!b.preferred && !b.acceptable)) {
            return -1;
        }
        if ((!a.preferred && !a.acceptable) && (b.acceptable || b.preferred)) {
            return 1;
        }
        if (a.type.conceptId < b.type.conceptId) {
            return -1;
        }
        if (a.type.conceptId > b.type.conceptId) {
            return 1;
        }
        if (a.type.conceptId === b.type.conceptId) {
            if (a.preferred && !b.preferred) {
                return -1;
            }
            if (!a.preferred && b.preferred) {
                return 1;
            }
            if (a.preferred === b.preferred) {
                if (a.term < b.term) {
                    return -1;
                }
                if (a.term > b.term) {
                    return 1;
                }
            }
        }
    }

    return 0;
}

@Component({
    selector: 'app-concept-desc-table',
    templateUrl: './concept-desc-table.component.html'
})
export class ConceptDescTableComponent {
    public static ISA = '116680003';
    public static INFERRED = 'INFERRED_RELATIONSHIP';
    public static STATED = 'STATED_RELATIONSHIP';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) { }
    public termCount = {};
    private conceptTemp;
    @Input() refSetLanguage;
    @Input() set concept(value) {
        this.conceptTemp = value;
    }

    get terms() {
        function checkLang(desc, refset) {
            return desc.acceptabilityMap && !!desc.acceptabilityMap[refset.conceptId];
        }
        const terms: any[] = this.conceptTemp.descriptions.filter(desc => checkLang(desc, this.refSetLanguage)).filter(desc => desc.active);
        const t = terms.map(desc => {
            let preferred = false;
            let acceptable = false;
            const acceptability = desc.acceptabilityMap[this.refSetLanguage.conceptId];
            if (acceptability === 'PREFERRED') {
                preferred = true;
            } else {
                if (acceptability === 'ACCEPTABLE') {
                    acceptable = true;
                }
            }
            return {
                ...desc,
                preferred,
                acceptable
            };
        }).sort(sortTerm);
        return t;
    }

    get languageName() {
        switch (this.refSetLanguage.conceptId) {
            case '900000000000508004':
                return 'GB';
            case '900000000000509007':
                return 'US';
            case '450828004':
            case '231000013101':
                return 'ES';
            case '554461000005103':
                return 'DA';
            case '46011000052107':
                return 'SV';
            case '32570271000036106':
                return 'AU';
            case '999001251000000103':
                return 'UK';
            case '31000146106':
                return 'NL';

        }
    }

}
