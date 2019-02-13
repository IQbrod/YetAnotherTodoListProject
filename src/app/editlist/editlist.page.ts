import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider } from '../todo/todo.service';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.page.html',
  styleUrls: ['./editlist.page.scss'],
})
export class EditlistPage implements OnInit {

  id: string;
  name: string = "";
  oldname: string = "";

  constructor(private route: ActivatedRoute, private todoServ: TodoServiceProvider) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoServ.getName(this.id).subscribe((n : string) => {
      this.name = n;
      this.oldname = n;   
    });
  }

  edit() {
    this.todoServ.editListName(this.id,this.name);
  }

}
