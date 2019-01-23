import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo/todo.model';
import { TodoServiceProvider } from '../todo/todo.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.page.html',
  styleUrls: ['./list-items.page.scss'],
})
export class ListItemsPage implements OnInit {

  id: string;
  name: string;
  mytodos: TodoItem[];

  constructor(private route: ActivatedRoute, private todoServ: TodoServiceProvider) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoServ.getTodos(this.id).subscribe((t : TodoItem[]) => {
      this.mytodos = t;   
    });
    this.todoServ.getName(this.id).subscribe((n : string) => {
      this.name = n;   
    });
  }

}
