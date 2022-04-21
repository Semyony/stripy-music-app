/*********************************************************************************
*  WEB422 – Assignment 5/6

*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Semen Khlavich Student ID: 107305203 Date: April 21, 2022
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})

export class FavouritesComponent implements OnInit {
  favourites: any;

  constructor(private musicDataService: MusicDataService) {}

  removeFromFavourites(id: string): void {
    this.musicDataService.removeFromFavourites(id).subscribe((musicData) => {
      this.favourites = musicData.tracks;
    });
  }

  ngOnInit(): void {
    this.musicDataService.getFavourites().subscribe((musicData) => {
      this.favourites = musicData.tracks;
    });
  }
}
