import { Injectable } from '@angular/core';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getUser() {
    return new User();
  }

}
