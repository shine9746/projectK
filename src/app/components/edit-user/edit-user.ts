import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser {
  public hide: boolean = false;
  public userForm: FormGroup = new FormGroup({})
  constructor(private dialogRef: MatDialogRef<EditUser>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(){
      this.initializeData();
    }

    initializeData(){
      
    }

    close() {
      this.dialogRef.close()
    }

}
