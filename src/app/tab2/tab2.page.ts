import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoServiceProvider } from '../todo/todo.service';
import { TodoList } from '../todo/todo.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  todolists : TodoList[] = [];
  @ViewChild('slidingList') slidingList: any;

  constructor(private todoService : TodoServiceProvider, private navctrl : NavController) {
    this.todoService.getList().subscribe((t : TodoList[]) => {
      this.todolists = t;
    })
  }

  ngOnInit() {
    console.log("tab 2 initialisée");
  }

  async delete(tdid : String) {
    this.todoService.deleteTodoList(tdid);
    await this.slidingList.closeSlidingItems()
  }
}
