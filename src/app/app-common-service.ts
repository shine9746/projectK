import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ISharedDataHandler {
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class AppCommonService {

  private sharedDataHandler = new Subject<ISharedDataHandler>();

  public set setSharedData(sharedData: ISharedDataHandler) {
    this.sharedDataHandler.next(sharedData)
  }

  public get getSharedData() {
    return this.sharedDataHandler.asObservable();
  }
  
}
