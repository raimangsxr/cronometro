import { Injectable } from '@angular/core';
import {Participant} from './app.component';
import {ChronometerTimes} from './manager/manager.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentParticipant: Participant;
  participants: Array<Participant> = [];

  constructor() {
    const participants: Participant[] = JSON.parse(localStorage.getItem('participants'));
    if (!participants) {
      const fillParticipant = this.createParticipant('- - -');
      for (let i = 0; i < 6; i++) {
        this.participants.push(Object.assign({}, fillParticipant));
      }
    } else {
      this.participants = participants;
    }
  }

  getCurrentParticipant(): Participant {
    return this.currentParticipant;
  }

  setCurrentParticipant(participant: Participant): void {
    this.currentParticipant = participant;
  }

  saveTime(times: ChronometerTimes) {
    this.currentParticipant.record = times.record;
    this.currentParticipant.millis = times.millis;
    this.saveTimeParticipant(this.currentParticipant);
  }

  private saveTimeParticipant(participant: Participant): void {
    this.addParticipant(participant);
  }

  private getNextId(): number {
    let nextId = 1;
    if (this.participants.length > 0) {
      const sortedParticipants = this.participants.sort((a, b) => (a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0));
      nextId = sortedParticipants[sortedParticipants.length - 1].id + 1;
    }
    return nextId;
  }

  createParticipant(participantName: string): Participant {
    return {
      id: 0,
      name: participantName,
      record: '00:00.000',
      millis: 0
    } as Participant;
  }

  addParticipant(participant: Participant): void {
    if (this.participants.length > 0 && this.participants[this.participants.length - 1].millis === 0) {
      this.participants.pop();
    }
    participant.id = this.getNextId();
    this.participants.push(Object.assign({}, participant));
    localStorage.setItem('participants', JSON.stringify(this.participants));
  }

  getParticipants(): Participant[] {
    return this.participants;
  }
}
