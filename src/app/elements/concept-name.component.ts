import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-concept-name',
  templateUrl: './concept-name.component.html',
  styleUrls: ['./concept-name.component.scss']
})
export class ConceptNameComponent {
    public static ISA = '116680003';
    public static INFERRED = '900000000000011006';
    public static STATED = '900000000000010007';

    @Input() concept;

}
