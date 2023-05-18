import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { User } from './model/user.model';
import { AuthenticationService } from './service/authentication.service';
import { GipherService } from './service/gipher.service';
import { RouterService } from './service/router.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { GipherViewComponent } from './gipher-view/gipher-view.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'payment-gateway',
    component:PaymentGatewayComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'bookmark',
    component:BookmarkComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookmarkComponent,
    FavouriteComponent,
    DashboardComponent,
    HeaderComponent,
    GipherViewComponent,
    PaymentGatewayComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    ToastrModule.forRoot()
  ],
  providers: [RouterService,AuthenticationService,GipherService,User,CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
