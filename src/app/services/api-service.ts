// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public signUpUser(data: any) {
    return this.http.post('https://localhost:7162/api/Authentication/signup', data);
  }

  public logIn(data: any) {
    return this.http.post('https://localhost:7162/api/Authentication/Login', data);
  }

  public getAllUsers() {
    return this.http.get('https://localhost:7162/api/Users/GetAllUsers');
  }
  
  public updateUser(payload: any) {
    return this.http.put('https://localhost:7162/api/Users/UpdateUser', payload);
  }
  
  public createPost(payload: any) {
    return this.http.post('https://localhost:7162/api/Posts/CreatePost', payload);
  }

   public getAllPosts() {
    return this.http.get('https://localhost:7162/api/Posts/GetAllPosts');
  }

  public userPostInteraction(payload: any) {
    return this.http.post('https://localhost:7162/api/Posts/UserPostInteraction', payload);
  }

  public deleteUser(payload: any) {
    return this.http.post('https://localhost:7162/api/Users/DeleteUser', payload);
  }

  public UserComments(payload: any) {
    return this.http.post('https://localhost:7162/api/Comments/UserComments', payload);
  }

  public getUserComments(payload: any) {
    return this.http.post('https://localhost:7162/api/Comments/GetPostComments', payload);
  }

  public deleteUserComments(payload: any) {
    return this.http.post('https://localhost:7162/api/Comments/DeleteComments', payload);
  }
  
}
