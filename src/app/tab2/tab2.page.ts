import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoServiceProvider } from '../todo/todo.service';
import { TodoList } from '../todo/todo.model';
import { NavController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  todolists : TodoList[] = [];
  @ViewChild('slidingList') slidingList: any;

  constructor(private todoService : TodoServiceProvider, private navctrl : NavController, private alertCtrl : AlertController) {
    this.todoService.getList().subscribe((t : TodoList[]) => {
      this.todolists = t;
    })
  }

  ngOnInit() {
    console.log("tab 2 initialisée");
  }

  async delete(tdid : String, name : String) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      subHeader: 'Delete List',
      message: 'Are you sure you want to permanently delete the list: "'+name+'" ?',
      buttons: [
        {
            text: 'No',
            handler: () => {
                console.log('Cancel clicked');
            }
        },
        {
            text: 'Yes',
            handler: () => {
               this.todoService.deleteTodoList(tdid);
            }
        }
    ]
    });
    this.resetList();
    await alert.present();
  }

  async resetList() {
    await this.slidingList.closeSlidingItems();
  }
}
