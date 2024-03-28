import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users:Users[]=[];
  constructor(private http:HttpClient){

  }

  userForm = new FormGroup({
    name: new FormControl(),
    email : new FormControl()
  })

  ngOnInit(): void {
      this.getUsers().subscribe((response)=>{
        this.users = response;    
      })
  }

  onSubmit(){
    this.postUser().subscribe((response)=>{
        this.users.push(response);
    })
}
  getUsers(){
    return this.http.get<Users[]>('https://jsonplaceholder.typicode.com/users')
  }

  postUser(){
    return this.http.post<Users>('https://jsonplaceholder.typicode.com/users',{
      name:this.userForm.controls.name.value,
      email:this.userForm.controls.email.value
    })
  }
}
class Users{
  name!:string;
  email!:string;
}