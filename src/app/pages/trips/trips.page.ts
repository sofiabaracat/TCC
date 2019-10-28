import { RouterModule, Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TripsService } from './trips.service';
import { HomeService } from './../../home/home.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Trip } from 'src/app/model/trip/trip.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit, AfterViewInit {

  userKey;
  trips = new BehaviorSubject(new Trip());
  tripArray = [];
  loading = true;
  
  constructor(
    private nav: NavController,
    private tripsService: TripsService,
    private auth: AngularFireAuth,
    private router: Router,
  ){
    this.getTrips();
  }

  getTrips(){
    console.log(this.tripArray)
    this.auth.authState.subscribe(async user => {
      this.userKey = await user.uid
      console.log(this.userKey)
      this.tripsService.getAll(this.userKey).subscribe(item => {
        console.log(item)
        item.forEach(item => {
          const key = item.payload.key;
          const data =  item.payload.val();
          const details = false;
          console.log(item)
          this.tripArray.push({ key, details, ...data });
          this.loading = false;
        })
      })
    })
    console.log(this.tripArray)
  }
  
  ngOnInit() {
    console.log(this.tripArray)
    console.log(
      this.router.getCurrentNavigation()
    )
  }
  
  
  ngAfterViewInit(){
  }
  
  details(key){
    console.log(key);
    this.tripArray.forEach(trip => {
      if(trip.key === key){
        trip.details = !trip.details;
      }
    })
  }

  edit(key){
    let data= JSON.stringify(key);
    this.router.navigate(["/new-trip", key]);
  }

  delete(key){
    console.log('delete', key)
    this.tripsService.remove(this.userKey, key).then(item =>
      {
      this.tripArray = [];
      this.getTrips();
    }
    );
  }
}
