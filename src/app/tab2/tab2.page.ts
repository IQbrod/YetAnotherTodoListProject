import { Component, OnInit } from '@angular/core';
import { TodoServiceProvider } from '../todo/todo.service';
import { TodoList } from '../todo/todo.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  todolists : TodoList[] = [];

  constructor(private todoService : TodoServiceProvider) {
    this.todoService.getList().subscribe((t : TodoList[]) => {
      this.todolists = t;
    })
  }

  ngOnInit() {
    console.log("tab 2 initialisée");
  }
}
