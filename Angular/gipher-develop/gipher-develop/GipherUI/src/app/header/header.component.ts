import { Component } from '@angular/core';
import { RouterService } from '../service/router.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isloggedIn :Boolean;
  isNoteView: Boolean;
  constructor(private routerService: RouterService, private authService: AuthenticationService,private notifyService:NotificationService) {
    this.isNoteView = true;
  }

  logout(){
    this.authService.logout();
    
    this.routerService.routeToLogin();
    this.notifyService.showSuccess("Logout successfull !!", "Gipher App");
  }
  isUserLoggedIn(){
     this.authService.isUserLoggedIn().subscribe(flag =>{
         this.isloggedIn = flag;
     });
    return this.isloggedIn;
  }

}
