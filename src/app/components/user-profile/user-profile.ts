import { Component, signal } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { IUserDetails } from '../../interface/iuser-details';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditUser } from '../edit-user/edit-user';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
 public gendersList:any[] = [
    {key: 1, value: "Male",icon:"male"},
    {key: 2, value: "Female",icon:"female"},
    {key: 3, value: "Others",icon:"person"}
  ]
public constructor(private commonService: CommonService, private router: Router,private dialog:MatDialog) {
  }
public userDetails = signal<IUserDetails | null>(null);
  ngOnInit() {
    this.getUserDetails();
  }

  private getUserDetails() {
    this.userDetails.set(this.commonService.userDetails);
  }

  public logout() {
    this.commonService.clearStorage();
    this.router.navigate(['authentication']);
  }

  edit() {
    this.dialog.open(EditUser, {
    width: '420px',
    data : {
      userDetails : this.commonService.userDetails
    }
  });
  }
}
