import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public API_URL: string = "http://localhost:1334";

  constructor() { }
}
