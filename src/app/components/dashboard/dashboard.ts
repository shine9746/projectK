import { Component, signal } from '@angular/core';
import { AppCommonService } from '../../app-common-service';
import { ApiService } from '../../services/api-service';
import { CommonService } from '../../services/common-service';
import { IUserDetails } from '../../interface/iuser-details';
interface Post {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

export class Dashboard {
  mobileMenuOpen = false;
  postComposerOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.postComposerOpen = false;
  }

  togglePostComposer() {
    this.postComposerOpen = !this.postComposerOpen;
    this.mobileMenuOpen = false;
  }

  closeAll() {
    this.mobileMenuOpen = false;
    this.postComposerOpen = false;
  }
}
