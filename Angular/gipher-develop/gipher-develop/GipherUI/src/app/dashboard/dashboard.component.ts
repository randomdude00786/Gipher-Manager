import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Gipher } from '../model/gipher.model';
import { GipherService } from '../service/gipher.service';
import { RouterService } from '../service/router.service';
import { Validators } from '@angular/forms';
import {GipherViewComponent} from '../gipher-view/gipher-view.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  
  searchedGiphers: Array<Gipher>;
  value : string
  submitMessage: String = '';
  submitted : Boolean = false;
  react : string = 'reaction';
  enter : string = 'entertainment';
  sports : string= 'sports';
  sticker : string= 'sticker';
  reactionGiphers: Array<Gipher>;
  sportsGiphers: Array<Gipher>;
  stickerGiphers: Array<Gipher>;
  entertainmentGiphers: Array<Gipher>;
  constructor(private gipherService: GipherService, private routerService: RouterService) {}

  searchForm = new FormGroup ({
    query : new FormControl('', [Validators.required])
  });
  
  
  searchSubmit() {
    this.submitted = true;
    this.gipherService.fetchGiphers(this.searchForm.value.query).subscribe(
      data => {
      this.searchedGiphers=data;
    }, err => {
      console.log(err);
    });
  }
  searchhashaserror() {
    return this.query.hasError('required') ? true : false;
  }
  
  get query() {
    return this.searchForm.get('query');
  }

  set query(query) {
    this.query.setValue(query);
  }

  get lf() {
    return this.searchForm.controls;
  }
  
  ngOnInit() {
    this.value = "";
    this.react = "reaction";
    this.enter = "entertainment";
    this.sports = "sports";
    this.sticker = "sticker";
    this.gipherService.fetchGiphers(this.react).subscribe(
      data => {
      this.reactionGiphers=data;
    }, err => {
      console.log(err);
    });
    this.gipherService.fetchGiphers(this.enter).subscribe(
      data => {
      this.entertainmentGiphers=data;
    }, err => {
      console.log(err); 
    });
    this.gipherService.fetchGiphers(this.sports).subscribe(
      data => {
      this.sportsGiphers=data;
    }, err => {
      console.log(err);
    });
    this.gipherService.fetchGiphers(this.sticker).subscribe(
      data => {
      this.stickerGiphers=data;
    }, err => {
      console.log(err);
    });
  }

}
