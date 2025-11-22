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
public userDetails = signal<IUserDetails | null>(null);


newPostText: any = signal('');
  createPost() {
    if (!this.newPostText().trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: {
        name: 'You',
        avatarUrl: 'https://i.pravatar.cc/150?img=3'
      },
      content: this.newPostText(),
      createdAt: new Date(),
      likes: 0
    };
    this.newPostText.set('');
  }

  public constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

  private getUserDetails() {
    this.userDetails.set(this.commonService.userDetails);
  }
}
