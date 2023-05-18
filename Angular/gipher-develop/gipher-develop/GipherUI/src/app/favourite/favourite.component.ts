import { Component, OnInit } from '@angular/core';
import { Gipher } from '../model/gipher.model';
import { GipherService } from '../service/gipher.service';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  giphers: Array<Gipher>;
  constructor(private gipherService: GipherService, private authenticationService: AuthenticationService,private toastr: ToastrService) { }

  getSantizeUrl(url:string) {
    return this.gipherService.getSantizeUrl(url);
  }

  ngOnInit() {
    this.gipherService.fetchFavouriteGipher(this.authenticationService.getUserId()).subscribe(
      data => {
        this.giphers = data;
      }, err => {
        console.log(err);
      });
  }
  removeFromFavourites(gipher: Gipher) {
    gipher.favouritedBy = null; // Clear the bookmarkedBy field
    this.gipherService.updateGipher(gipher).subscribe(
      data => {
        this.updateExistingGiphers(data);
        this.toastr.success('Gipher removed from Favourites!', 'Success');
      },
      err => {
        console.log('removeFromFavourites: ' + err);
      }
    );
  }

  updateExistingGiphers(gipher: Gipher) {
    const index = this.giphers.findIndex(g => g.gipherId === gipher.gipherId);
    if (index !== -1) {
      if ( gipher.favouritedBy === null &&  gipher.bookMarkedBy === null) {
        // Remove the Gipher from the array if it is neither bookmarked nor favorited
        this.giphers.splice(index, 1);
      } else {
        // Update the Gipher in the array if it is bookmarked or favorited
        this.giphers[index] = gipher;
      }
    }
  }
}
