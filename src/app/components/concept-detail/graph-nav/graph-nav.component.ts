import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
    selector: 'app-graph-nav',
    templateUrl: './graph-nav.component.html',
    styleUrls: ['./graph-nav.component.scss']
})
export class GraphNavComponent implements OnInit {

    get circle1X() {
        return this.initialX + 90;
    }

    get circle1Y() {
        return this.initialY + 40 + 40;
    }

    get circle2X() {
        return this.circle1X + 55;
    }

    get circle2Y() {
        return this.circle1Y;
    }

    get initialIsARelX() {
        return this.circle2X + 40;
    }

    get initialIsARelY() {
        return this.circle2Y - 18;
    }

    get initialZeroAttributeY() {
        return this.circle2Y - 18 + this.isARel.length * (39 + 25);
    }

    get initialGroupAttributeY() {
        return this.initialZeroAttributeY + this.zeroAttribute.length * (39 + 25) + 15;
    }

    get isPrimitive() {
        return this.concept.definitionStatus === 'PRIMITIVE';
    }

    get isARel() {
        if (this.concept) {
            return this.concept.relationships.filter((rel) => rel.active && rel.target)
                .filter(rel => rel.type.conceptId === '116680003')
                .filter(rel => rel.characteristicType === GraphNavComponent.INFERRED);
        }
        return [];
    }

    get zeroAttribute() {
        if (this.concept) {
            return this.concept.relationships.filter((rel) => rel.active && rel.target)
                .filter(rel => rel.type.conceptId !== '116680003')
                .filter(rel => rel.groupId === 0)
                .filter(rel => rel.characteristicType === GraphNavComponent.INFERRED);
        }
        return [];
    }

    get getAttributeGroup() {
        const maxGroup = this.concept.relationships
            .filter((rel) => rel.active && rel.target)
            .filter(rel => rel.type.conceptId !== '116680003')
            .filter(rel => rel.characteristicType === GraphNavComponent.INFERRED)
            .reduce((a, b) => Math.max(a, b.groupId), 0);
        const result = [];
        for (let i = 1; i <= maxGroup; i++) {
            result.push(
                this.concept.relationships
                    .filter((rel) => rel.active && rel.target)
                    .filter(rel => rel.type.conceptId !== '116680003')
                    .filter(rel => rel.characteristicType === GraphNavComponent.INFERRED)
                    .filter(rel => rel.groupId === i)
            );
        }
        return result;
    }

    constructor(
        private cd: ChangeDetectorRef,
        private conceptDetailService: ConceptDetailService) { }
    public static INFERRED = 'INFERRED_RELATIONSHIP';
    public static STATED = 'STATED_RELATIONSHIP';
    public concept: any;

    // @ViewChild('elConcept') elConcept: SctBoxComponent;

    public initialX = 10;
    public initialY = 10;

    offsetGroupAttrY(index) {
        let y = 0;
        for (let i = 1; i <= index; i++) {
            y += this.getAttributeGroup[i - 1].length * (39 + 25);
        }
        return y;
    }
    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            this.concept = concept;
        });
    }

    selectConcept(concept) {
        this.conceptDetailService.select(concept);
    }

}
