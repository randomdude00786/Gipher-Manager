import { Component, OnInit, Input } from '@angular/core';
import { GipherService} from '../service/gipher.service';
import { Gipher } from '../model/gipher.model';
import { NotificationService } from '../notification.service';
import { PaymentGatewayComponent } from '../payment-gateway/payment-gateway.component';
@Component({
  selector: 'app-gipher-view',
  templateUrl: './gipher-view.component.html',
  styleUrls: ['./gipher-view.component.css']
})
export class GipherViewComponent implements OnInit {
  @Input() public searchedGiphers: Array<Gipher>;
  
  constructor(private gipherService: GipherService,private notifyService:NotificationService) { }

  getSantizeUrl(url:string){
    return this.gipherService.getSantizeUrl(url);
  }
  
  bookmarkGipher(gipher:Gipher){
    gipher.bookMarkedBy = gipher.userId; 
    this.gipherService.updateGipher(gipher).subscribe(data => {
      this.updateExistingGiphers(data);
    },err =>{
      console.log("bookmarkGipher: "+err);
    });
  }

  favouriteGipher(gipher:Gipher){
    gipher.favouritedBy = gipher.userId;
    this.gipherService.updateGipher(gipher).subscribe(data =>{
      this.updateExistingGiphers(data);
      console.log(gipher.favouritedBy);
      this.notifyService.showSuccess("Favourite Successfull", "Gipher App")
    },err=>{
      console.log("favouriteGipher: "+err);
    });
  }

  updateExistingGiphers(gipher:Gipher){
    for(var i=0;i<this.searchedGiphers.length;i++){
      if(gipher.gipherId == this.searchedGiphers[i].gipherId){
        this.searchedGiphers[i]=gipher;
        break;
      }
    }
  }

  ngOnInit() {
  }

}
