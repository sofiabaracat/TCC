import { User } from './../model/user/user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, private toastController: ToastController) { }

  getUser() {
    this.auth.auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        return user;
      } else {
        console.log('não ta logado')
      }
    });
  }

  register(email, password){
    this.auth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Success!', value);
      let toast = this.toastController.create({
        message: 'Usuário criado com sucesso',
        duration: 2000
      }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });    
  }

  login(email: string, password: string) {
    this.auth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  get(key: string) {
    return this.db.object('users/' + key).snapshotChanges()
      .pipe(
        map(c => {
          return { key: c.key, ...c.payload.val() };
        })
      )
  }

  remove(key: string) {
    return this.db.list('users').remove(key);
  }

}