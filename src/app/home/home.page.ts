import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { stringify } from 'querystring';
import { AuthenticationserviceService } from '../shared/authenticationservice.service';
//import { info } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    public authService: AuthenticationserviceService
  ) {
    const taskJson = localStorage.getItem('taskDb');

    if (taskJson != null) {
      this.tasks = JSON.parse(taskJson);
    }
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'secondary',
      header: 'Cadastrar nova tarefa:',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'O que deseja fazer?',
        },
        {
          name: 'categoria',
          type: 'number',
          placeholder: 'Selecione uma Categoria',
          min: 0,
          max: 5,
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da tarefa',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.task, form.description, form.categoria);
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  async add(newTask: string, detalhes: string, categoria: number) {
    if (newTask.trim().length < 1) {
      //VALIDA SE O USUÁRIO PREENCHEU A TAREFA
      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer',
        duration: 2000,
        position: 'top',
      });

      toast.present();
      return;
    }

    const task = {
      name: newTask,
      done: false,
      info: detalhes,
      cat: categoria,
      color: 'success',
    };

    this.tasks.push(task);

    if (task.cat === 1) {
      task.color = 'categoria1';
    }
    if (task.cat === 2) {
      task.color = 'categoria2';
    }
    if (task.cat === 3) {
      task.color = 'categoria3';
    }
    if (task.cat === 4) {
      task.color = 'categoria4';
    }
    if (task.cat === 5) {
      task.color = 'categoria5';
    }

    //this.tasks.push(task);

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }

  async openActions(task: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O QUE DESEJA FAZER?',
      buttons: [
        {
          text: task.done ? 'Desmarcar' : 'Marcar',
          icon: task.done ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            task.done = !task.done;

            this.updateLocalStorage();
          },
        },
        {
          text: 'Descrição',
          icon: 'search',
          handler: () => {
            console.log('Search clicked');
            this.showDescription(task);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  delete(task: any) {
    this.tasks = this.tasks.filter((taskArray) => task !== taskArray);

    this.updateLocalStorage();
  }

  async showDescription(task: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: task.name,
      subHeader: 'Categoria :     ' + task.cat,
      message: task.info,

      buttons: [
        {
          text: 'Ok',
          handler: (form) => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }
}
