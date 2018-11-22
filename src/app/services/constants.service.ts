import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public API_URL: string = "http://localhost:3004/";

  constructor() { }
}
