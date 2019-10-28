import { User } from './../model/user/user.model';
import { HomeService } from './home.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formLogin: FormGroup;
  formRegister: FormGroup;
  user = new User;
  public loginPage: boolean = true;
  public currentUser;
  public login: boolean = false;
  
  constructor(private homeService: HomeService, private toast: ToastController) {
    this.createForm();
    this.currentUser = this.homeService.getUser();
    if(this.currentUser){
      this.login = true;
    }
  }
  
    createForm() {
      this.formRegister = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email),
        password: new FormControl(this.user.password),
        
      })
      this.formLogin = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email),
        password: new FormControl(this.user.password),
        
      })
    }

    onSubmitLogin(){
      this.homeService.login(this.formLogin.value.email, this.formLogin.value.password);
      this.login = true;
    }

    registerButton() {
      console.log(this.loginPage)
      this.loginPage = !this.loginPage;
    }

    onSubmit() {
      // if(this.formRegister.valid){
        this.homeService.register(this.formRegister.value.email, this.formRegister.value.password)
       
       
      // }
    }
}
