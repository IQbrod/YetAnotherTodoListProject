import { Injectable } from '@angular/core';
import {TodoItem, TodoList} from "./todo.model";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore"

@Injectable()
export class TodoServiceProvider {

  data: TodoList[] = [];
  counter : number = 0;

  constructor(private afs: AngularFirestore) {
    
    this.getList().subscribe( (x : TodoList[]) => {
      this.data = x;
    });
  }

  private updateTodoList(tdl: TodoList) {
    this.getTodoList().doc(tdl.uuid).set({
      uuid: tdl.uuid,
      name: tdl.name,
      items: tdl.items,
      img : tdl.img
    })
  }

  /* -- Database Access -- */
  private getTodoList(): AngularFirestoreCollection<TodoList> {
    return this.afs.collection('/todolist');
  }

  public getList(): Observable<TodoList[]> {
    return this.getTodoList().valueChanges();
  }

  /* -- Get info from local datas -- */
  public getTodos(uuid:String) : Observable<TodoItem[]> {
    return Observable.of(this.data.find(d => d.uuid == uuid).items)
  }

  public getName(uuid:String) : Observable<String> {
    return Observable.of(this.data.find(d => d.uuid == uuid).name)
  }

  public getImg(uuid:String) : Observable<String> {
    return Observable.of(this.data.find(d => d.uuid == uuid).img)
  }

  public getTodo(listUuid: String, uuid: String) : Observable<TodoItem> {
    let items = this.data.find(d => d.uuid == listUuid).items;
    return Observable.of(items.find(t => t.uuid == uuid));
  }

  /* -- Edit distant data -- */
  public editListName(listUuid: string, editedName: string) {
    let lst = this.data.find(d => d.uuid == listUuid);
    lst.name = editedName;
    // Force update
    this.updateTodoList(lst);
  }

  public editTodo(listUuid : string, editedItem: TodoItem) {
    let lst = this.data.find(d => d.uuid == listUuid);
    let index = lst.items.findIndex(value => value.uuid == editedItem.uuid);
    lst.items[index] = editedItem;

    this.getTodoList().doc(listUuid).set({
      uuid: lst.uuid,
      name: lst.name,
      items: lst.items,
      img : lst.img
    })
  }

  public deleteTodo(listUuid: string, uuid: string) {
    let lst = this.data.find(d => d.uuid == listUuid);
    let index = lst.items.findIndex(value => value.uuid == uuid);
    if (index != -1) {
      lst.items.splice(index,1);
    }

    this.updateTodoList(lst);
  }

  public deleteTodoList(listUuid: string) {
    this.getTodoList().doc(listUuid).delete();
  }

  public addItem(id, title: string, desc: string, done: boolean) {
    let lst = this.data.find(d => d.uuid == id);
    const uid = this.afs.createId();

    lst.items.push({
      uuid : uid,
      name : title,
      desc : desc,
      complete : done
    });

    this.updateTodoList(lst);    
  }

  public createTodoList(nm: String, imgid: string): Promise<any> {
    const id = this.afs.createId();

    return new Promise<any>((resolve, reject) => {
      this.afs.doc(`/todolist/${id}`).set({
        uuid: id,
        name: nm,
        items: [],
        img: imgid
      })
    })
  }

  public switchitem(lid: string, uuid: string) {
    let lst = this.data.find(d => d.uuid == lid);
    let index = lst.items.findIndex(value => value.uuid == uuid);
    lst.items[index].complete = ! lst.items[index].complete;

    this.updateTodoList(lst);
  }
}
