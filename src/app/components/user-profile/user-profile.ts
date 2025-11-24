import { Component, signal } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { IUserDetails } from '../../interface/iuser-details';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditUser } from '../edit-user/edit-user';
import { ConfirmationPopup } from '../confirmation-popup/confirmation-popup';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

public constructor(private commonService: CommonService, private router: Router,private dialog:MatDialog,
  private apiService: ApiService
) {
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
    const dialogRef = this.dialog.open(EditUser, {
    width: '420px',
    data : {
      userDetails : this.commonService.userDetails
    }
  });
  dialogRef.afterClosed().subscribe((value:boolean)=>{
    if(value) {
      this.getUserDetails();
    }
  });
  }

   deleteUser() {
      this.dialog.open(ConfirmationPopup,{
         width: '420px',
         data: {
          title : "Delete Account",
          message: "Do you want to delete your account?.Enter your password to continue!",
          fieldsList : [{label: "Password",fieldType: "inputPassword",key:0,fieldControl:"password"}],
          buttonsList : [{key:0,displayName:"No",color:""},{key:1,displayName:"Yes",color:"warn"}],
          callBackFunction : this.deleteFunction.bind(this),
          mode: "DELETE_USER"
         }
      })
    }

    deleteFunction(callbackResponse: any) {
      if(!callbackResponse?.fieldData["password"]) {
        this.commonService.toaster("Please enter password to continue!",'toast-error');
        return;
      }
      const payload = {
        userId: this.commonService.userDetails?.userId,
        password: callbackResponse?.fieldData["password"]
      }
      this.apiService.deleteUser(payload).subscribe((response: any)=>{
        if(response?.mode === 1) {
           this.commonService.toaster(response?.message,'toast-success');
           this.commonService.clearStorage();
           this.router.navigate(['authentication']);
           callbackResponse?.dialogRef?.close();
           return;
        }
        else {
          this.commonService.toaster(response?.message,'toast-error');
        }
      })
      
    }
}
