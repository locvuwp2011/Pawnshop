import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from '../../interfaces';

@Injectable()
export class UserService {
    private apiUrl: string = 'http://localhost:3000/User';
    private headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) { }

    create(user: User) {
        return this.httpClient.post<User>(this.apiUrl + '/create', user, { headers: this.headers });
    }

    findUser(value: string, criteria: string) {
        return this.httpClient.get<User[]>(this.apiUrl + '/find/' + encodeURIComponent(value) + '/' + criteria, { headers: this.headers });
    }
}