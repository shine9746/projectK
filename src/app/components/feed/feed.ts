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
  arr: any[] = []
  refreshActive = false;
  filterActive = false;
  public get userId() {
    return this.commonService?.userDetails?.userId;
  }
  constructor(private apiService: ApiService, private commonService: CommonService) {

  }

  ngOnInit() {
    this.getAllPosts();
    this.getSharedData();
  }

  private getAllPosts() {
    this.apiService.getAllPosts().subscribe((response: any) => {
      if (response?.mode === 1) {
        response?.postsList.forEach((post: any) => {
          post.liked = post.interactionMode === 1;
          post.disLiked = post.interactionMode === 2;
        })
        this.posts.set(response?.postsList);
      }
      else {
        this.commonService.toaster(response?.responseMessage, 'toaster-error');
      }
    })
  }

  public buttonAction(post: any, buttonKey: number) {
    if (buttonKey === 1) {
      post.liked = !post.liked;
      post.disLiked = false;
      post.postLikes = post.liked ? +1 : 0;
      post.postDisLikes = post.postDisLikes > 1 ? -1 : 0;
    }
    else {
      post.disLiked = !post.disLiked;
      post.liked = false;
      post.postDisLikes = post.disLiked ? +1 : 0;
      post.postLikes = post.postLikes > 1 ? -1 : 0;
    }
    const interactedUser = this.userId;
    const payload = {
      postId: post?.postId,
      userId: Number(interactedUser),
      InteractionMode: this.userInteraction(post),
    }

    this.apiService.userPostInteraction(payload).subscribe((response: any) => {
      if (response.mode !== 1) {
        this.commonService.toaster(response?.responseMessage, 'toaster-error');
      }
      this.getAllPosts();
    })
  }

  userInteraction(post: any) {
    let mode = 3;
    if (!post.liked && !post.disLiked) {
      mode = 3
    }
    else if (post.liked) {
      mode = 1
    }
    else if (post.disLiked) {
      mode = 2
    }
    return mode;
  }


  toggleRefresh() {
    this.refreshActive = !this.refreshActive;
  }

  toggleFilter() {
    this.filterActive = !this.filterActive;
  }

  getSharedData() {
    this.commonService.getSharedDataHandler().subscribe((response: any) => {
      if (["POST_CREATED", "USER_UPDATED"]?.includes(response?.type)) {
        this.getAllPosts();
      }
    })
  }


  toggleComments(post: any) {
    post.showComments = !post.showComments;

    if (post.showComments && !post.commentsLoaded) {
      this.getUserComments(post);
    }
  }

  submitComment(post: any) {
    if (!post?.comment?.toString()?.trimLeft()?.length) return;
    const payload = {
      userId: Number(this.commonService?.userDetails?.userId),
      postId: Number(post?.postId),
      commentContent: post?.comment
    }
    this.apiService.UserComments(payload).subscribe((response: any) => {
      if (response?.mode === 1) {
        this.commonService.toaster(response?.responseMessage, 'toaster-success');
        this.getUserComments(post);
        post.comment = "";
      }
    });
  }

  private getUserComments(post: any) {
    this.apiService.getUserComments(post).subscribe((response: any) => {
      if (response?.mode === 1) {
        post.comments = response?.comments;
        post.commentsCount = response?.comments?.length;
      }
    })
  }

  public deleteUserComments(comment: any,post: any) {
    this.apiService.deleteUserComments(comment.commentId).subscribe((response: any) => {
      this.commonService.toaster(response?.responseMessage || "Something went wrong",
        response?.mode === 1 ? 'toaster-success' : 'toaster-error');
        if(response?.mode === 1) {
          this.getUserComments(post);
        }
    });
  }

}
