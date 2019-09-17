import { Component, Input } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';
import { ConceptDetailService } from '../components/concept-detail/concept-detail.service';

function sortRel(a, b) {
    if (a.groupId < b.groupId) {
        return -1;
    } else if (a.groupId > b.groupId) {
        return 1;
    } else {
        if (a.type.conceptId === '116680003') {
            return -1;
        }
        if (b.type.conceptId === '116680003') {
            return 1;
        }
        if (a.target.fsn.term < b.target.fsn.term) {
            return -1;
        }
        if (a.target.fsn.term > b.target.fsn.term) {
            return 1;
        }
        return 0;
    }
}

@Component({
    selector: 'app-concept-rel-table',
    templateUrl: './concept-rel-table.component.html'
})
export class ConceptRelTableComponent {
    public static ISA = '116680003';
    public static INFERRED = 'INFERRED_RELATIONSHIP';
    public static STATED = 'STATED_RELATIONSHIP';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) { }

    private conceptTemp;
    @Input() set concept(value) {
        this.conceptTemp = value;

    }

    get relationships() {
        const rels = this.conceptTemp.relationships.filter(rel => rel.characteristicType === ConceptRelTableComponent.STATED);
        return rels.sort(sortRel);
    }




}
