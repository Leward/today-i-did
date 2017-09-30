import {NgModule} from "@angular/core";
import {FillTheDayPage} from "./fill-the-day";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [FillTheDayPage],
  imports: [IonicPageModule.forChild(FillTheDayPage)],
  exports: [FillTheDayPage]
})
export class FillTheDayPageModule {
}
