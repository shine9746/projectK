import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { CommonService } from '../../services/common-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.scss'],
})
export class Authentication {
  public registrationForm: FormGroup = new FormGroup({});
  public previewUrl: string | ArrayBuffer | null = null;
  public buttonsList = [
    { key: 0, label: 'Submit', icon: 'send', buttonClass: 'round-btn submit-btn' },
    { key: 1, label: 'Login', icon: 'login', buttonClass: 'round-btn login-btn' }
  ]
  public isLogin: boolean = true;
  public imageBase64: string | undefined;
  public gendersList:any[] = [
    {key: 1, value: "Male"},
    {key: 2, value: "Female"},
    {key: 3, value: "Others"}
  ]
  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private commonService: CommonService, private router: Router) { }
  ngOnInit() {
    this.commonService.clearStorage();
    this.initializeForm();
  }

  private initializeForm() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      gender: [1, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      file: ['', Validators.required]
    });
    this.registrationForm.markAllAsTouched();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result?.toString()
      const base64 = reader.result?.toString().split(',')[1];
      this.registrationForm.get('file')?.setValue(base64 || "");
    };
    reader.readAsDataURL(file);
    }

  public buttonController(btn: any) {
    switch (btn.key) {
      case 0:
        this.signUpUser();
        break;
      case 1:
        this.isLogin = !this.isLogin;
        this.buttonsList[1].icon = this.isLogin ? 'person_add' : 'login';
        this.initializeForm();
        break;
    }
  }

  private signUpUser() {
    if(this.registrationForm.get('password')?.value !== this.registrationForm.get('confirmPassword')?.value && !this.isLogin){
      this.commonService.toaster("Password should be same as above",'toast-error');
      return;
    }
    this.apiService[this.isLogin ? 'logIn' : 'signUpUser'](this.registrationForm.getRawValue()).subscribe((response: any) => {
          if (response.mode === 1) {
            if(this.isLogin){
              this.setAuthDetails(response);
              this.router.navigate(['/dashboard',this.commonService.sessionId]);
              return;
            }
            this.commonService.toaster(response.responseMessage,'toast-success');
            this.registrationForm.reset();
            this.isLogin = true;
          }
          else{
            this.commonService.toaster(response.responseMessage,'toast-error');
          }
        });
  }

  private setAuthDetails(data: any) {
    const decoded: any = jwtDecode(data.jwtToken);
    this.commonService.authToken = data.jwtToken;
    this.commonService.sessionId = `${decoded.userName}`;
    this.commonService.userDetails = JSON.stringify(decoded);
  }

}
