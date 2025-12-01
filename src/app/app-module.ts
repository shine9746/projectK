import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Authentication } from './components/authentication/authentication';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Dashboard } from './components/dashboard/dashboard';
import { UserProfile } from './components/user-profile/user-profile';
import { Feed } from './components/feed/feed';
import { UserPost } from './components/user-post/user-post';
import { InputController } from './directives/input-controller';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TopNavigation } from './components/top-navigation/top-navigation';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { EditUser } from './components/edit-user/edit-user';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationPopup } from './components/confirmation-popup/confirmation-popup';
import { Peoples } from './components/peoples/peoples';
import { MatListModule } from '@angular/material/list';
import { SearchFilterPipe } from './pipes/search-filter-pipe';
@NgModule({
  declarations: [
    App,
    Authentication,
    Dashboard,
    UserProfile,
    Feed,
    UserPost,
    InputController,
    TopNavigation,
    EditUser,
    ConfirmationPopup,
    Peoples,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatRadioModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [App]
})
export class AppModule { }
