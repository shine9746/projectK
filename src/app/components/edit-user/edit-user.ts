import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../services/common-service';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser {
  public hide: boolean = false;
  public userForm: FormGroup = new FormGroup({});
  public imageFilePath: string = "";
  public imageBase64: string = "";
  constructor(private dialogRef: MatDialogRef<EditUser>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
  private commonService: CommonService,private apiService: ApiService) {
    }

    ngOnInit(){
      this.initializeData();
    }

    initializeData(){
      const userDetails = this.commonService.userDetails;
      this.userForm = this.formBuilder.group({
      userName: [userDetails?.userName, Validators.required],
      phoneNumber: [userDetails?.phoneNumber, Validators.required],
      address: ['', Validators.required],
      email: [userDetails?.email, Validators.required],
      gender: [userDetails?.gender, Validators.required],
      file: ['', Validators.required]
      });
      this.imageFilePath = userDetails?.filePath ?? "";
      console.log(this.commonService.userDetails);

    }

    onFileSelected(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result?.toString() ?? "";
      const base64 = reader.result?.toString().split(',')[1];
      this.userForm.get('file')?.setValue(base64 || "");
    };
    reader.readAsDataURL(file);
    this.imageFilePath = "";
    }

    public updateUser() {
      const payload = {
        ...this.userForm.getRawValue(),
        ...{userId : this.commonService.userDetails?.userId}
      }
       this.apiService.updateUser(payload).subscribe((response: any)=>{
        if(response.mode === 1) {
          this.commonService.toaster(response.message,"toaster-success");
          const updatedUserDetails = payload;
          this.commonService.userDetails = JSON.stringify({         
            ...this.commonService.userDetails,
            ...updatedUserDetails,
            ...{filePath: response?.filePath}
          });
          this.commonService.setSharedDataHandler({
          type: "USER_UPDATED",
          data: ""
        });
          this.dialogRef.close(true);
        }
        
        this.commonService.toaster(response.message,"toaster-error");
       })
    }

    close() {
      this.dialogRef.close(false);
    }

}
