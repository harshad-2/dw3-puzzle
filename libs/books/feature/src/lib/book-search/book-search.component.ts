import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
  getBooksError
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, AppConstants } from '@tmo/shared/models';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books$ = this.store.select(getAllBooks);
  getBooksError$ = this.store.select(getBooksError);
  searchText$: Subscription;
  appConstants = AppConstants;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchText$ = this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.searchBooks();
    });
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue(this.appConstants.SEARCH_BOOKS.JAVASCRIPT);
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
  trackByFnBooks(book: Book): string {
    return book.id;
  }

  ngOnDestroy() {
    this.searchText$?.unsubscribe();
  }
}