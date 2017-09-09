import {Injectable} from "@angular/core";
import {Storage} from '@ionic/storage';

import * as moment from "moment";

import {Day} from "../models/day";
import {Observable} from "rxjs";
import {Moment} from "moment";

@Injectable()
export class Days {

  constructor(public storage: Storage) {
  }

  private compareFunction(a: Day, b: Day): number {
    if (a.date.isBefore(b.date)) {
      return 1;
    }
    if (a.date.isAfter(b.date)) {
      return -1;
    }
    return 0;
  }

  private getDaysForPage(page: number): Observable<Day[]> {
    const daysPerPage = 7;
    const firstItem = (page - 1) * daysPerPage;
    return Observable.range(firstItem, daysPerPage)
      .flatMap(this.getDay.bind(this))
      .scan((acc: Day[], one: Day) => acc.concat(one), [])
  }

  getDay(n: Number): Observable<Day> {
    const date = moment().subtract(n, 'days');
    const fallbackValue = {date: date} as Day;
    const key = this.keyForDate(date);
    return Observable.fromPromise(this.storage.get(key)
      .then(value => (value) ? this.fromObject(value) as Day : fallbackValue));
  }

  getDays(page: Observable<number>): Observable<Day[]> {
    return page.flatMap(this.getDaysForPage.bind(this));
  }

  private keyForDate(date: Moment) {
    return date.format('yyyy-MM-DD');
  }

  private keyForDay(day: Day) {
    return this.keyForDate(day.date);
  }

  update(day: Day) {
    console.log("UPDATE");
    console.log(day);
    const key = this.keyForDay(day);
    return this.storage.set(key, this.toObject(day));
  }

  private fromObject(object: any): Day {
    object.date = moment(object.date);
    return object as Day;
  }

  private toObject(day: Day): any {
    return {
      date: day.date.toISOString(),
      content: day.content
    };
  }

}
