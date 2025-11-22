import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonService } from '../../services/common-service';
import { IUserDetails } from '../../interface/iuser-details';

@Component({
  selector: 'app-user-post',
  standalone: false,
  templateUrl: './user-post.html',
  styleUrl: './user-post.scss',
})
export class UserPost {
  private userDetails?: IUserDetails | null;
  public titleInput : string = "";
  public contentInput: string = "";
  constructor(private apiService: ApiService,private commonService: CommonService) {

  }

  ngOnInit() {
    this.initialize();
  }

  public createPost() {
    if(this.userDetails?.userId) {
      const payload = {
        userId: Number(this.userDetails?.userId),
        postTitle: this.titleInput,
        postContent: this.contentInput
      }
      this.apiService.createPost(payload).subscribe((response: any)=>{
        if(response?.mode === 1) {
          this.commonService.toaster(response.responseMessage,'toast-success')
        }
      })
    }
  }

  private initialize() {
      this.userDetails = this.commonService.userDetails ?? null;
      this.titleInput = this.contentInput = "";
  }

}
