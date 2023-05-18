import { Injectable } from '@angular/core';
import { Gipher } from '../model/gipher.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Injectable()
export class GipherService {
    
    giphers: Array<Gipher>;
    gipherSubject: BehaviorSubject<Array<Gipher>>;
    
    constructor(private authService: AuthenticationService, private httpClient: HttpClient, private sanitizer: DomSanitizer) {
        this.giphers = [];
        this.gipherSubject = new BehaviorSubject(this.giphers);
    }
    
    fetchGiphers(query:string) {
        const token = this.authService.getBearerToken();
        const headerValue = 'Bearer ' + token;
        return this.httpClient.get<Array<Gipher>>(`http://localhost:8087/api/v1/gipher/externalapi/${this.authService.getUserId()}/${query}`, {
            headers: new HttpHeaders().set('Authorization', headerValue)
        })
    }

    updateGipher(gipher:Gipher) {
        const token = this.authService.getBearerToken();
        const headerValue = 'Bearer ' + token;
        return this.httpClient.post<Gipher>('http://localhost:8087/api/v1/gipher/', gipher,{
            headers: new HttpHeaders().set('Authorization', headerValue)
        })
    }
    fetchBookmarkedGipher(userId:string) {
        const token = this.authService.getBearerToken();
        const headerValue = 'Bearer ' + token;
        return this.httpClient.get<Array<Gipher>>(`http://localhost:8087/api/v1/gipher/bookmark/${userId}`, {
            headers: new HttpHeaders().set('Authorization', headerValue)
        })
    }

    fetchFavouriteGipher(userId:string) {
        const token = this.authService.getBearerToken();
        const headerValue = 'Bearer ' + token;
        return this.httpClient.get<Array<Gipher>>(`http://localhost:8087/api/v1/gipher/favourite/${userId}`, {
            headers: new HttpHeaders().set('Authorization', headerValue)
        })
    }

    getSantizeUrl(url:string){
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
}
