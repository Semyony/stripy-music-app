import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.musicDataService
        .searchArtists(params['q'])
        .subscribe((artistData) => {
          this.results = artistData.artists.items.filter(
            (i) => i.images.length > 0
          );
        });
    });
  }
}
