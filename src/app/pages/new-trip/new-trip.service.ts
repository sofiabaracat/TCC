import { async } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Trip } from 'src/app/model/trip/trip.model';

@Injectable({
  providedIn: 'root'
})
export class NewTripService {

  userKey;
  user;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {   
    this.auth.authState.subscribe(user => {
      if(user) this.userKey = user.uid
    })
  }

  getTrip(key, userKey) {
      return this.db.object('/trips/' + userKey + "/" + key).snapshotChanges();
      
  }

  save(trip: Trip) {
    return new Promise(async(resolve, reject) => {
      console.log(trip.key)
      if (trip.key) {
        this.db.list('/trips/' + this.userKey)
        .update(trip.key, { ...trip })
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        console.log(this.userKey)
        this.db.list('/trips/' + this.userKey)
          .push({ ...trip })
          .then((item) => 
          {
            console.log(item);
          resolve();
        })
      }
    }).catch(e => console.log(e))
  }
}
