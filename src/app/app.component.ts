import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Item } from './items';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-Do';

  filter: 'all' | 'active' | 'done' = 'all';


  allitems = [
    {description: "Otworzyć ToDo App", done: true, edit: true}
  ];

  
  todo: Item[] = [];
  done: Item[] = [];

  assignTasks(){
    this.todo = [];
    this.done = [];
    for(var task of this.allitems){
      if(task.done === true){
        if(this.done.indexOf(task) === -1) {
          this.done.push(task) ;
        }
      } 
      else if(this.todo.indexOf(task) === -1) {
        this.todo.push(task) ;
      }
    } 
    
    return this.todo, this.done;
  }

  ngOnInit() {
    this.assignTasks();
  }

  get items() {
    if(this.filter == 'all') {
      return this.allitems;
    }
    this.assignTasks();
    if(this.filter == 'active') {
      return this.todo;
    }
    if(this.filter == 'done') {
      return this.done;
    }
    return this.allitems.filter(item => this.filter === 'done' ? item.done : !item.done);
  }

  addItem (description: string) {
    this.allitems.unshift({
      description,
      done: false,
      edit: true
    });
    this.assignTasks();
  }

  editItem(task:Item){
    console.log("click");
  }

  deleteItem(task: Item){
    this.allitems = this.allitems.filter(item => item != task)
    this.assignTasks();
  }

  toggleItem(task: Item[], i: number) {
    task[i].done = !task[i].done;
    this.assignTasks();
  }

  checkItem(task: Item) {
    task.done = !task.done;
    this.assignTasks();
  }

  toggleDisplay(task: Item) {
    task.edit = !task.edit;
  }

  saveChanges(description: string, task: Item) {
    task.description = description;
    task.edit = !task.edit;
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.toggleItem(event.container.data, event.currentIndex);
    }
  }
}
