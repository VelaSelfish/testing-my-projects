import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicos/auth.service";
import { Router } from "@angular/router";

import { AlertController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, 
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    
  }

  onSubmitLogin(){
   this.authService.login(this.email, this.password).then(res => {
     this.presentToast()
     this.router.navigate(['/home'])
   }).catch(err => this.presentAlert())
  }

  // ALERTA DE DADOS ERRADOS
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      subHeader: 'O usuário não existe',
      message: 'Os seus dados estão incorrectos.',
      buttons: ['OK']
    });

    await alert.present();

}

/* ESTE É O UM ALERTA DE BOAS VINDAS.
async welcome() {
  const alert = await this.alertController.create({
    header: 'Bem vindo',
    message: 'Login realizado com sucesso.',
    buttons: ['OK']
  });

  await alert.present();

}*/ 

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Seja bem vindo a caixa de reclamação!',
    position: 'top',
    duration: 3000
  });
  toast.present();
}
}
