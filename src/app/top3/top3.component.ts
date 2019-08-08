import { Component, OnInit } from '@angular/core';
import {Participant} from '../app.component';
import {AppService} from '../app.service';

@Component({
  selector: 'app-top3',
  templateUrl: './top3.component.html',
  styleUrls: ['./top3.component.css']
})
export class Top3Component implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  getTop3(): Participant[] {
    const sortedParticipants = this.appService.getParticipants().sort(
      (a, b) => (a.millis < b.millis) ? 1 : ((a.millis > b.millis) ? -11 : 0)
    );
    return sortedParticipants.slice(0, 3);
  }

}
