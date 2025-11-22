import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonService } from '../../services/common-service';

@Component({
  selector: 'app-feed',
  standalone: false,
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
 posts = signal<any[]>([]);

  constructor(private apiService: ApiService,private commonSerivce: CommonService) {

  }

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.apiService.getAllPosts().subscribe((response: any)=>{
      if(response?.mode === 1) {
        response?.postsList.forEach((post: any)=>{
          post.liked = post.interactionMode === 1;
          post.disLiked = post.interactionMode === 2;
        })
        this.posts.set(response?.postsList);
      }
      else{
        this.commonSerivce.toaster(response?.responseMessage, 'toaster-error');
      }
    })
  }

  public buttonAction(post: any,buttonKey: number) {
    if(buttonKey === 1) {
      post.liked = !post.liked;
      post.disLiked = false;
      post.postLikes = post.liked ? +1 : 0;
      post.postDisLikes = post.postDisLikes > 1 ? -1 : 0;
    }
    else{
      post.disLiked = !post.disLiked;
      post.liked = false;
      post.postDisLikes = post.disLiked ? +1 : 0;
      post.postLikes = post.postLikes > 1 ? -1 : 0;
    }
    const interactedUser = this.commonSerivce.userDetails?.userId;
    const payload = {
      postId : post?.postId,
      userId : Number(interactedUser),
      InteractionMode: this.userInteraction(post) ,
    }

    this.apiService.userPostInteraction(payload).subscribe((response: any)=>{
      if(response.mode !== 1) {
        this.commonSerivce.toaster(response?.responseMessage, 'toaster-error');
      }
      this.getAllPosts();
    })
  }

  userInteraction(post: any) {
    let mode = 3;
    if(!post.liked && !post.disLiked) {
      mode = 3
    }
    else if(post.liked) {
      mode = 1
    }
    else if(post.disLiked) {
      mode = 2
    }
    return mode;
  }

  refreshActive = false;
filterActive = false;

toggleRefresh() {
  this.refreshActive = !this.refreshActive;
  // your refresh logic here
}

toggleFilter() {
  this.filterActive = !this.filterActive;
  // your filter logic (All posts / My posts toggle) here
}
}
