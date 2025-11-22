import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppCommonService } from '../../app-common-service';
import { CommonService } from '../../services/common-service';

@Component({
  selector: 'app-top-navigation',
  standalone: false,
  templateUrl: './top-navigation.html',
  styleUrl: './top-navigation.scss',
})
export class TopNavigation {
  public navButtonsList = [
    {key:0, label: 'Home', route: '/home', icon: 'home',iconClass: 'navIcon' },
    {key:1, label: 'Signup', route: '/Signup', icon: 'person_add',iconClass: 'navIcon' },
    {key:2, label: 'Logout', route: '/Logout', icon: 'logout',iconClass: 'navIcon' },
    {key:3,label: '', route: '', icon: 'dark_mode',iconClass: 'navIcon' },
  ]
  public themeMode: string = "dark_mode";
  public constructor(private appCommonService: AppCommonService,private commonService: CommonService) {
  }
  ngOnInit() {
  }
  menuAction(nav: any) {
    switch (nav.key) {
      case 0:
        // Home action 
        break;
      case 1:
        // Signup action:
        break;
      case 3:
        this.themeMode = nav.icon = nav.icon === 'dark_mode' ? 'light_mode' : 'dark_mode';
        this.appCommonService.setSharedData = {type: 'TOGGLE_THEME', data: nav.icon};
        break;      
    }
  }

  getUsers() {
    return this.commonService?.userDetails;
  }

}
