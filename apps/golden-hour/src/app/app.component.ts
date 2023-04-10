import {Component, OnInit, signal} from '@angular/core';
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import {Geolocation, Position} from '@capacitor/geolocation';
import {catchError, Observable, of, tap} from 'rxjs';

@Component({
  standalone: true,
  imports: [ RouterModule, IonicModule],
  selector: "native-apps-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "golden-hour";
  watchId!: any;

  public signal = signal(19)

  public  latitude= signal<number|null>(null)
  public longitude=signal<number|null>(null)


  error = signal<string|null>('error de base') ;

  public getCurrentPosition() {


    this.getCurrentPositionObservable()
      .pipe(
        tap(console.log),
        tap((any) => console.log('tap', any)),
        tap(position => {
          console.log('Current position:', position.coords);
        }),
        catchError(error => {
          console.error('Error getting location:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  getCurrentPositionObservable(): Observable<Position> {
    return new Observable(observer => {
      Geolocation.getCurrentPosition()
        .then(position => {
          observer.next(position);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }


  async ngOnInit() {
    const permissionGranted = await this.requestGeolocationPermission();
    if (permissionGranted) {
      this.getCurrentPositionObservable().subscribe(
        position => {
          this.latitude.set(position.coords.latitude);
          this.longitude.set(position.coords.longitude);
          console.log('Current position:', position.coords);
        },
        error => {
          this.error.set(error);
          console.error('Error getting location:', error);
        }
      );
    }
  }


  async requestGeolocationPermission() {
    try {
      const status = await Geolocation.requestPermissions();

      if (status.coarseLocation !== 'granted' || status.location !== 'granted') {
        console.log('Geolocation permission denied');
        this.error.set('Geolocation permission denied');

        return false;
      } else {
        this.error.set('Geolocation permission granted');
        console.log('Geolocation permission granted');
        return true;
      }
    } catch (error) {
      this.error.set(error as string);

      console.error('Error requesting geolocation permission:', error);
      return false;
    }
  }

}
