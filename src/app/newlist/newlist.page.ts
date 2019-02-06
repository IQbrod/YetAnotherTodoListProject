import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TodoServiceProvider } from '../todo/todo.service';

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.page.html',
  styleUrls: ['./newlist.page.scss'],
})
export class NewlistPage implements OnInit {

  constructor(private navctrl : NavController, private todoServ : TodoServiceProvider) {}

  public title : string = "";

  ngOnInit() {
  }

  create() {
    this.todoServ.createTodoList(this.title);
  }

}
