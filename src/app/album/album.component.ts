import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  public album: any;

  constructor(
    private snackBar: MatSnackBar,
    private MusicDataService: MusicDataService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.MusicDataService.getAlbumById(params['id']).subscribe(
        (data) => (this.album = data)
      );
    });
  }

  
  addToFavourites(trackID: string): void {
    this.MusicDataService.addToFavourites(trackID).subscribe(
      {
          next: (data) => {
            this.snackBar.open('Adding to Favourites...', 'Done', {
              duration: 1500,
            })
          },
          error: (err) => {
              this.snackBar.open('Unable to add song to Favourites...', 'Done', {
                duration: 1500,
              })
          },
          complete: () => {
            console.log('Request complete');
          }
        });
      
  }
}
