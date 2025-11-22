import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ISharedDataHandler } from '../app-common-service';
import { IUserDetails } from '../interface/iuser-details';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private sharedDataHandler = new Subject<ISharedDataHandler>();
  public constructor(private snackBar: MatSnackBar) {}

  public toaster(message: string,panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  set authToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  get authToken(): string | null {
    return localStorage.getItem('authToken');
  }

  set sessionId(sessionId: string) {
    localStorage.setItem('sessionId', sessionId);
  }  
  
  get sessionId(): string | null {
    return localStorage.getItem('sessionId');
  } 

  set userDetails(userDetails: string) {
    localStorage.setItem('userDetails', userDetails);
  }  
  
  get userDetails(): IUserDetails | null{
    const value = localStorage.getItem('userDetails') || ""
    const userDetails: any = value ? JSON.parse(value) : null;
    return userDetails;
  } 

  public setSharedDataHandler(object: any){
    this.sharedDataHandler.next(object);
  }

  public getSharedDataHandler(){
    return this.sharedDataHandler;
  }

  public clearStorage() {
    localStorage.clear();
  }
  
}
