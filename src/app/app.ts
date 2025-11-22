import { Component, signal } from '@angular/core';
import { AppCommonService } from './app-common-service';
import { CommonService } from './services/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projektK');
  public themeModeClassBody: string = 'light-theme-body';
  public themeModeClassNav: string = 'light-theme-nav';
  public constructor(private appCommonService: AppCommonService,private commonService: CommonService, private router: Router ) {
  }

  ngOnInit() {
    this.appCommonService.getSharedData.subscribe((sharedData) => {
      if (sharedData.type === 'TOGGLE_THEME') {
        this.themeModeClassBody = sharedData.data === 'dark_mode' ? 'light-theme-body' : 'dark-theme-body';  
        this.themeModeClassNav = sharedData.data === 'dark_mode' ? 'light-theme-nav' : 'dark-theme-nav';
      }
    });
    this.getRouterEvents();
  }

   private getRouterEvents() {
    this.router.events.subscribe((events: any) => {
      if (events?.url?.includes('/login')) {
        this.commonService.clearStorage();
      }
    })
  }
}
