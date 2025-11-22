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

    likePost(id: number) {
    this.posts.update(posts =>
      posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p)
    );
  }

  constructor(private apiService: ApiService,private commonSerivce: CommonService) {

  }

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.apiService.getAllPosts().subscribe((response: any)=>{
      if(response?.mode === 1) {
        this.posts.set(response?.postsList);
      }
      this.commonSerivce.toaster(response?.responseMessage, response?.mode === 1 ? 'toaster-success' : 'toaster-error');
    })
  }
}
