import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _searchResults: any;

  set searchResults(data: any) {
    this._searchResults = data;
  }

  get searchResults(): any {
    return this._searchResults;
  }
}
