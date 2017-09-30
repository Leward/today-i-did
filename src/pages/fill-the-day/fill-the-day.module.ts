import {NgModule} from "@angular/core";
import {FillTheDayPage} from "./fill-the-day";
import {IonicPageModule} from "ionic-angular";
import {DayComponent} from "../../components/day.component";
import {Nl2BrPipe} from "../../pipes/nl2br.pipe";

@NgModule({
  declarations: [FillTheDayPage, DayComponent, Nl2BrPipe],
  imports: [IonicPageModule.forChild(FillTheDayPage)],
  exports: [FillTheDayPage]
})
export class FillTheDayPageModule {
}
