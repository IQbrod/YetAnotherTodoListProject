import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo/todo.model';
import { TodoServiceProvider } from '../todo/todo.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.page.html',
  styleUrls: ['./list-items.page.scss'],
})
export class ListItemsPage implements OnInit {

  id: string;
  name: string;
  mytodos: TodoItem[];

  @ViewChild('slidingList') slidingList: any;

  constructor(private route: ActivatedRoute, private todoServ: TodoServiceProvider, private navctrl : NavController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoServ.getTodos(this.id).subscribe((t : TodoItem[]) => {
      this.mytodos = t;   
    });
    this.todoServ.getName(this.id).subscribe((n : string) => {
      this.name = n;   
    });
  }

  async delete(tdid : string, nm : string) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      subHeader: 'Delete Item',
      message: 'Are you sure you want to permanently delete the item: "'+nm+'" ?',
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
              this.todoServ.deleteTodo(this.id, tdid);
            }
        }
    ]
    });
    await alert.present();
    this.resetList();
    this.navctrl.navigateForward('/list-items/'+this.id);
  }

  async resetList() {
    await this.slidingList.closeSlidingItems();
  }

  async edit(uuid: string) {
    this.resetList();
    this.navctrl.navigateForward('/edititem/'+this.id+'/'+uuid);
  }

  async checkitem(uuid: string) {
    this.todoServ.switchitem(this.id,uuid);
  }
}
