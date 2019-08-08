import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {Participant} from '../app.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ChronometerService} from '../chronometer.service';

export interface ChronometerTimes {
  record: string;
  millis: number;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  @ViewChild('name', {static: true}) nameField: ElementRef;
  @ViewChild('submit', {static: true}) submitField: ElementRef;
  chronometerForm: FormGroup;

  constructor(
    private chronoService: ChronometerService,
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.chronometerForm = this.formBuilder.group({name: ''});
  }

  ngOnInit() { }

  createParticipant(formValues: any): void {
    if (formValues.name && formValues.name.trim() !== '') {
      const newParticipant = this.appService.createParticipant(formValues.name);
      this.appService.setCurrentParticipant(newParticipant);
      this.chronoService.startChronometer();
      this.submitField.nativeElement.focus();
    }
    this.chronometerForm.reset();
  }

  getCurrentParticipant(): Participant {
    return this.appService.getCurrentParticipant();
  }

  stopChronometer(): void {
    this.chronoService.stopChronometer();
    this.nameField.nativeElement.focus();
  }

  getChronometerTime(): ChronometerTimes {
    return this.chronoService.getChronometerTime();
  }

}
