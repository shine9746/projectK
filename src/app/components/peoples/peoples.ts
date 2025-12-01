import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-peoples',
  standalone: false,
  templateUrl: './peoples.html',
  styleUrl: './peoples.scss',
})
export class Peoples {
  constructor(private apiService: ApiService){

  }
public usersList: any[] = [];
public searchUsers: any=""
ngOnInit() {
  this.getAllUsers();

}

getAllUsers() {
  this.apiService?.getAllUsers().subscribe((response:any)=>{
    if(response?.mode === 1) {
      this.usersList = response?.usersList;
    }
  })
}

}
