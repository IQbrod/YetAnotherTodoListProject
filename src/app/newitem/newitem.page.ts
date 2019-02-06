import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider } from '../todo/todo.service';

@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.page.html',
  styleUrls: ['./newitem.page.scss'],
})
export class NewitemPage implements OnInit {

  id: string;
  name: string;

  public title : string = "";
  public desc : string = "";
  public done : boolean = false;

  constructor(private route: ActivatedRoute, private todoServ: TodoServiceProvider) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoServ.getName(this.id).subscribe((n : string) => {
      this.name = n;   
    });
  }

  create() {
    this.todoServ.addItem(this.id, this.title, this.desc, this.done);
  }

}
