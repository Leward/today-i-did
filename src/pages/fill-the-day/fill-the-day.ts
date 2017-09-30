import {Component} from "@angular/core";

import {IonicPage, NavController} from "ionic-angular";

import {Days} from "../../providers/days";
import {Day} from "../../models/day";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@IonicPage({
  name: 'fill-the-day',
  segment: 'days'
})
@Component({
  selector: 'fill-the-day',
  templateUrl: 'fill-the-day.html'
})
export class FillTheDayPage {

  page = new BehaviorSubject(1);
  daysForCurrentPage: Day[];
  currentPage = 1;

  constructor(public navCtrl: NavController, public days: Days) {
    days.getDays(this.page).subscribe(value => this.daysForCurrentPage = value);
  }

  nextPage() {
    this.page.next(this.page.value + 1);
  }

  previousPage() {
    if(this.page.value > 1) {
      this.page.next(this.page.value - 1);
    }
  }

}
