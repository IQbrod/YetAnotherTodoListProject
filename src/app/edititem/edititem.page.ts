import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider } from '../todo/todo.service';
import { TodoItem } from '../todo/todo.model';
import { NavController } from '@ionic/angular';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.page.html',
  styleUrls: ['./edititem.page.scss'],
})
export class EdititemPage implements OnInit {

  id: string;
  listid: string;

  todo: TodoItem;
  oldname: String;
  olddesc: String;

  constructor(private route: ActivatedRoute, private todoServ: TodoServiceProvider, private navctrl : NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.listid = this.route.snapshot.paramMap.get('listid');
    this.todoServ.getTodo(this.listid,this.id).subscribe((t : TodoItem) => {
      this.todo = t;
      this.oldname = t.name;
      this.olddesc = t.desc;  
    });
  }

  edit() {
    this.todoServ.editTodo(this.listid,this.todo);
  }

}