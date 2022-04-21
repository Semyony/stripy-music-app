import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  public albums: any;
  public artist: any;

  constructor( private ActivatedRoute: ActivatedRoute, private MusicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      
      //retrieving albums
      this.MusicDataService.getAlbumsByArtistId(params['id']).subscribe((albumData) => {
        this.albums = albumData.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);;
      });
      
      //retrieving artist
      this.MusicDataService.getArtistById(params['id']).subscribe((artistData) => {
        this.artist = artistData;
      });
      
    });
  }

}
