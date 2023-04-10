import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NxWelcomeComponent } from "./nx-welcome.component";

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, IonicModule],
  selector: "native-apps-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "golden-hour";
}
