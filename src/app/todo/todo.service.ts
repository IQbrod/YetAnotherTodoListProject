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

  public getTodo(listUuid: String, uuid: String) : Observable<TodoItem> {
    let items = this.data.find(d => d.uuid == listUuid).items;
    return Observable.of(items.find(t => t.uuid == uuid));
  }

  /* -- Edit distant data -- */
  public editListName(listUuid: string, editedName: string) {
    let lst = this.data.find(d => d.uuid == listUuid);
    // Force update
    this.getTodoList().doc(listUuid).set({
      uuid: lst.uuid,
      name: editedName,
      items: lst.items
    })
  }

  public editTodo(listUuid : string, editedItem: TodoItem) {
    let lst = this.data.find(d => d.uuid == listUuid);
    let index = lst.items.findIndex(value => value.uuid == editedItem.uuid);
    lst.items[index] = editedItem;

    this.getTodoList().doc(listUuid).set({
      uuid: lst.uuid,
      name: lst.name,
      items: lst.items
    })
  }

  public deleteTodo(listUuid: string, uuid: string) {
    let lst = this.data.find(d => d.uuid == listUuid);
    let index = lst.items.findIndex(value => value.uuid == uuid);
    if (index != -1) {
      lst.items.splice(index,1);
    }

    this.getTodoList().doc(listUuid).set({
      uuid: lst.uuid,
      name: lst.name,
      items: lst.items
    })
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

    this.getTodoList().doc(id).set({
      uuid: lst.uuid,
      name: lst.name,
      items: lst.items  
    })
    
  }

  public createTodoList(nm: String): Promise<any> {
    const id = this.afs.createId();

    return new Promise<any>((resolve, reject) => {
      this.afs.doc(`/todolist/${id}`).set({
        uuid: id,
        name: nm,
        items: []
      })
    })
  }
}
