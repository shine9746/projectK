import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppCommonService } from '../../app-common-service';
import { CommonService } from '../../services/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  standalone: false,
  templateUrl: './top-navigation.html',
  styleUrl: './top-navigation.scss',
})
export class TopNavigation {
  public navButtonsList = [
    {key:0, label: 'Home', routePath: '/dashboard', icon: 'home',iconClass: 'navIcon' },
    {key:1, label: 'Friends', routePath: '/friends', icon: 'people',iconClass: 'navIcon' },
    {key:2, label: 'Add People', routePath: '/peoples', icon: 'person_add',iconClass: 'navIcon' },
    {key:3,label: '', routePath: '', icon: 'dark_mode',iconClass: 'navIcon' },
  ] 
  public themeMode: string = "dark_mode";
  public constructor(private appCommonService: AppCommonService,private commonService: CommonService,private router: Router) {
  }
  ngOnInit() {
  }
  menuAction(nav: any) {
    switch (nav.key) {
      case 0:
        this.router.navigate(["/dashboard",this.commonService.sessionId]);
        break;
      case 1:
        this.router.navigate(["/peoples",this.commonService.sessionId]);
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
