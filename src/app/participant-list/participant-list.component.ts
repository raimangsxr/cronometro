import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Participant} from '../app.component';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  getParticipants(): Participant[] {
    return this.appService.getParticipants().sort((a, b) => (a.id < b.id) ? 1 : ((a.id > b.id) ? -1 : 0));
  }

}
