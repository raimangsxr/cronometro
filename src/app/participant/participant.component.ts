import {Component, Input, OnInit} from '@angular/core';
import {Participant} from '../app.component';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  @Input() participant: Participant;
  @Input() position: number;
  constructor() { }

  ngOnInit() {
  }

}
