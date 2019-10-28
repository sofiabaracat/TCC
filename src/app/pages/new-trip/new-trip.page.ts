import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Destination } from './../../model/destination/destination.model';
import { NewTripService } from './new-trip.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Trip } from 'src/app/model/trip/trip.model';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.page.html',
  styleUrls: ['./new-trip.page.scss'],
})
export class NewTripPage implements OnInit, AfterViewInit {
  
  trip = new Trip;
  
  destinationsForm = [];

  destinations = [];

  totalPrice = 0;

  newTripForm: FormGroup;

  newDestination: FormGroup;

  destination = new Destination;

  loading: boolean = true;

  userKey

  currentTrip;

  newDestinationForm = false;

  openForm = false;

  index = null;

  edit = false;

  constructor(
    private newTripService: NewTripService, 
    private activatedRoute: ActivatedRoute, 
    private auth: AngularFireAuth,
    private toastController: ToastController) {
    console.log(
      this.activatedRoute.snapshot.paramMap.get('key')
    )

    
  }
  
  ngOnInit() {
    this.auth.authState.subscribe(async user => {
      this.userKey = await user.uid
      console.log(this.userKey)
      await this.newTripService.getTrip(this.activatedRoute.snapshot.paramMap.get('key'), this.userKey)
        .subscribe(async item => {
          console.log(this.currentTrip)
          this.currentTrip = await item.payload.val()
          if(this.currentTrip){
            this.currentTrip.key = await item.payload.key;
            this.edit = true;
            this.newTripForm = new FormGroup({
              name: new FormControl(this.currentTrip.name),
              passengers: new FormControl(this.currentTrip.passengers),
              origin: new FormControl(this.currentTrip.origin),
            })
            this.currentTrip.destination.forEach(destination => {
              this.destinations.push(destination);
            });
          } else{
            this.newTripForm = new FormGroup({
              name: new FormControl(this.trip.name),
              passengers: new FormControl(this.trip.passengers),
              origin: new FormControl(this.trip.origin),
            })
          }
          this.loading = false;
        })
    })
  }
  
  ngAfterViewInit(){

  }
  
  addDestination(i?){
    this.openForm = true;
    if(this.newDestinationForm){
      let toast = this.toastController.create({
        message: 'Por favor, termine de editar/adicionar o outro destino',
        duration: 2000
      }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
    }else if(i !== undefined) {
      this.index = i;
      console.log('to no if i', i)
      this.newDestination = new FormGroup({
        name: new FormControl(this.currentTrip.destination[i].name),
        type: new FormControl(this.currentTrip.destination[i].type),
        price: new FormControl(this.currentTrip.destination[i].price),
      })
    } else{
      console.log('to no else')
      this.newDestination = new FormGroup({
        name: new FormControl(this.destination.name),
        type: new FormControl(this.destination.type),
        price: new FormControl(this.destination.price),
      })
    }
    this.newDestinationForm = true;
  }
  
  saveDestination(){
    this.openForm = false;
    this.newDestinationForm = false;
    if(this.index !== null) {
      console.log('if index', this.index);
      this.destinations[this.index].name = this.newDestination.value.name;
      this.destinations[this.index].price = Number(Number(this.newDestination.value.price).toFixed(2));
      this.destinations[this.index].type = this.newDestination.value.type;
      this.index = null
    } else {
      console.log('else index', this.index);
      const destination = new Destination;
      destination.name = this.newDestination.value.name;
      destination.price = Number(Number(this.newDestination.value.price).toFixed(2));
      destination.type = this.newDestination.value.type;
      this.destinations.push(destination);
    }
    console.log(this.destinations)
  }

  saveTrip(){
    if(this.edit){
      this.trip.key = this.currentTrip.key;
    }
    console.log(this.destinations)
    let i = 0;
    this.destinations.map(destination => {
      i++
      console.log(this.totalPrice)
      this.totalPrice = this.totalPrice + + destination.price;
      console.log(this.totalPrice)
    })
    this.trip.totalPrice = Number((+ this.totalPrice * + this.newTripForm.value.passengers).toFixed(2));
    this.trip.name = this.newTripForm.value.name;
    this.trip.origin = this.newTripForm.value.origin;
    this.trip.passengers = this.newTripForm.value.passengers;
    this.trip.destination = this.destinations;
    this.newTripService.save(this.trip);
  }

}
