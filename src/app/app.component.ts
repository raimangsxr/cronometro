import {Component, OnInit} from '@angular/core';

export interface Participant {
  id: number;
  name: string;
  record: string;
  millis: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'I Torneo Internacional de Toro Mecánico';
  subtitle = 'XII Concentración Motera Ría de Noia';

  constructor() { }

  ngOnInit(): void { }
}
