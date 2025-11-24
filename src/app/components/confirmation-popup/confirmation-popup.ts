import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  standalone: false,
  templateUrl: './confirmation-popup.html',
  styleUrl: './confirmation-popup.scss',
})
export class ConfirmationPopup {
  public fieldDetails: any = {};
  public hide: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData : any = null,private matDialogRef: MatDialogRef<ConfirmationPopup>) { 
    if(this.fieldsList?.length) {
      this.fieldsList?.forEach((field: any)=>{
        this.fieldDetails[field.fieldControl]  = null;
      })
    }
  }
  get title() { return this.dialogData?.title; }
  get message() { return this.dialogData?.message; }
  get fieldsList() { return this.dialogData?.fieldsList}
  get buttonsList() {return this.dialogData?.buttonsList}

  public buttonAction(button: any) {
    if(button.key === 0) {
      this.matDialogRef.close();
      return;
    }
    const callbackresponse = {
      mode: this.dialogData.mode,
      dialogRef: this.matDialogRef,
      fieldData : this.fieldDetails

    }
    this.dialogData.callBackFunction(callbackresponse);
  }

}
