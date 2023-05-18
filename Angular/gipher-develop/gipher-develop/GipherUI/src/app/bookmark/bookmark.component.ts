import { Component, OnInit } from '@angular/core';
import { GipherService } from '../service/gipher.service';
import { Gipher } from '../model/gipher.model';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  giphers: Array<Gipher>;

  constructor(
    private gipherService: GipherService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.gipherService.fetchBookmarkedGipher(this.authenticationService.getUserId()).subscribe(
      data => {
        this.giphers = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSantizeUrl(url: string) {
    return this.gipherService.getSantizeUrl(url);
  }

  removeFromBookmarks(gipher: Gipher) {
    gipher.bookMarkedBy = null; // Clear the bookmarkedBy field
    this.gipherService.updateGipher(gipher).subscribe(
      data => {
        this.updateExistingGiphers(data);
        this.toastr.success('Gipher removed from bookmarks!', 'Success');
      },
      err => {
        console.log('removeFromBookmarks: ' + err);
      }
    );
  }

  updateExistingGiphers(gipher: Gipher) {
    const index = this.giphers.findIndex(g => g.gipherId === gipher.gipherId);
    if (index !== -1) {
      if (gipher.bookMarkedBy === null && gipher.favouritedBy === null) {
        // Remove the Gipher from the array if it is neither bookmarked nor favorited
        this.giphers.splice(index, 1);
      } else {
        // Update the Gipher in the array if it is bookmarked or favorited
        this.giphers[index] = gipher;
      }
    }
  }
}