import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Day} from "../models/day";
import * as moment from "moment";

@Component({
  selector: 'day',
  template: `
    <ion-card>
      <ion-card-header>
        <ion-item>
          <h2 *ngIf="!editMode">{{relativeDate(day)}} <small>{{day.date.format('DD MMM YYYY')}}</small></h2>
          <h2 *ngIf="editMode">What did you do {{relativeDate(day)}}?</h2>
          <button *ngIf="!editMode" ion-button clear item-end primary (click)="enterEditMode()">
            <ion-icon name='md-create' item-right>
            </ion-icon>
          </button>
        </ion-item>
      </ion-card-header>
      <ion-card-content>
        <div *ngIf="!editMode" [innerHTML]="day.content | nl2br">
        </div>
        <div *ngIf="editMode">
          <!-- Used textarea instead of ion-textarea as the latter caused selection issue on mobile (cannot select text not move cursor) -->
          <textarea
            placeholder="Example: I rode 15km after work and completed a getting started guide about Ionic"
            rows="5"
            [(ngModel)]="editValue"
            autofocus
          ></textarea>
          <button ion-button color="primary" (click)="saveFromEditMode()">
            Save
          </button>
          <button ion-button color="danger" (click)="cancelFromEditMode()">
            Cancel
          </button>
        </div>
      </ion-card-content>
    </ion-card>
  `
})
export class DayComponent {
  @Input() day: Day;
  @Output() dayUpdated = new EventEmitter<Day>();
  editMode: boolean = false;
  editValue: string;

  relativeDate(day: Day): string {
    const now = moment();
    const startOfTheDay = now.clone().startOf('day');
    const minutesSinceStartOfTheDay = now.diff(startOfTheDay, 'minutes');
    const minutesSinceDate = now.diff(day.date, 'minutes');
    const diffDays = Math.floor((minutesSinceDate - minutesSinceStartOfTheDay) / (24 * 60)) + 1;
    switch (diffDays) {
      case 0:
        return "Today";
      case 1:
        return "Yesterday";
      default:
        return diffDays + " days ago";
    }
  }

  enterEditMode() {
    this.editMode = true;
    this.editValue = this.day.content;
  }

  cancelFromEditMode() {
    this.editMode = false;
  }

  saveFromEditMode() {
    this.day.content = this.editValue;
    this.editMode = false;
    this.dayUpdated.emit(this.day);
  }

}
