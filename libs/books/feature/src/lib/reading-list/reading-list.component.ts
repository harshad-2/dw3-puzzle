import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { markBookAsFinished, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { AppConstants, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  appConstants = AppConstants;
  
  constructor(private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsFinished(item: ReadingListItem): void {
    this.store.dispatch(markBookAsFinished({ item }));
  }
}