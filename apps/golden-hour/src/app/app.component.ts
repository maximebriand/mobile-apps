import {Component, signal} from '@angular/core';
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

@Component({
  standalone: true,
  imports: [ RouterModule, IonicModule],
  selector: "native-apps-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "golden-hour";

  public signal = signal(19)
}
