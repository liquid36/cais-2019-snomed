import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SnomedAPI } from './services/snomed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'andes-browser';
    public textSearch = '';
    public result;
    constructor(private snomed: SnomedAPI) {}
    ngOnInit() {
    }
}
