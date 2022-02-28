import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = [];
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private actionSheetCtrl: ActionSheetController) {
    let taskJson = localStorage.getItem('taskDb');

    if (taskJson != null) {
      this.tasks = JSON.parse(taskJson);
    }
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cadastrar nova tarefa:',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'O que deseja fazer?'
        },
        {
          name: 'categoria',
          type: 'number',
          placeholder: 'Selecione uma Categoria',
          min: 0,
          max: 10
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.task)
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async add(newTask: string) {
    if (newTask.trim().length < 1) //VALIDA SE O USUÁRIO PREENCHEU A TAREFA
    {
      const toast = await this.toastCtrl.create
        ({
          message: 'Informe o que deseja fazer',
          duration: 2000,
          position: 'top',
        });

      toast.present();
      return;
    }
    let task = { name: newTask, done: false };

    this.tasks.push(task);

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }

  async openActions(task: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O QUE DESEJA FAZER?",
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;

          this.updateLocalStorage();
        }
      },
      {
        text: 'Cancelar',
        icon: 'clone',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    })
    await actionSheet.present();
  }

  delete(task: any) {
    this.tasks = this.tasks.filter(taskArray => task != taskArray);    

    this.updateLocalStorage();
  }

}
