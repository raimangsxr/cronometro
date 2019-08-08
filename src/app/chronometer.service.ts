import { Injectable } from '@angular/core';
import {ChronometerTimes} from './manager/manager.component';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ChronometerService {

  private startDate: Date;
  private timerDate: Date;
  private intervalId: number = null;
  private started = false;
  private stopped = false;

  constructor(private appService: AppService) { }

  getStarted(): boolean {
    return this.started;
  }

  startChronometer(): void {
    this.stopped = false;
    this.started = true;
    this.startDate = new Date();
    this.clearChronometer();
    this.intervalId = setInterval(() => {
      this.timerDate = new Date();
    }, 21);
  }

  stopChronometer(): void {
    clearInterval(this.intervalId);
    this.appService.saveTime(this.getChronometerTime());
    this.stopped = true;
    this.started = false;
  }

  clearChronometer(): void {
    this.timerDate = new Date(this.startDate.getTime());
  }

  getChronometerTime(): ChronometerTimes {
    if (!this.started && !this.stopped) {
      return {
        record: '00:00.000',
        millis: 0
      } as ChronometerTimes;
    }
    const diffTime = this.timerDate.getTime() - this.startDate.getTime();
    const minutes = Math.floor(diffTime / 60000);
    const seconds = Math.floor(((diffTime - (minutes * 60000)) / 1000));
    const milliseconds = diffTime - (minutes * 60000) - (seconds * 1000);
    return {
      record: this.pad(minutes, 2) + ':' + this.pad(seconds, 2) + '.' + this.pad(milliseconds, 3),
      millis: diffTime
    } as ChronometerTimes;
  }

  private pad(num: number, pad: number): string {
    return(1e15 + num + '').slice(-pad);
  }
}
