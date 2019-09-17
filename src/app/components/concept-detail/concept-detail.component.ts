import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { ConceptDetailService } from './concept-detail.service';

@Component({
  selector: 'app-concept-detail',
  templateUrl: './concept-detail.component.html',
  //   styleUrls: ['./app.component.scss']
})
export class ConceptDetailComponent implements OnInit {

  constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) { }

  ngOnInit() {
    // this.conceptDetailService.conceptSelected$.subscribe(concept => {

    // });
  }

}
