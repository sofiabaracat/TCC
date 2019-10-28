import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/model/trip/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  userKey;

  trip: AngularFireList<Trip>

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
  }
  
  getAll(userKey){
      console.log(userKey)
      return this.db.list('trips/' + userKey).snapshotChanges()
  }

  remove(userKey, key) {
    return this.db.list('trips/' + userKey).remove(key);
  }
}
