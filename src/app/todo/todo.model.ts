export interface TodoList {
  uuid : string,
  name : string,
  items : TodoItem[],
  img: any
}

export interface TodoItem {
  uuid? : string,
  name : string,
  desc? : string,
  complete : boolean
}
