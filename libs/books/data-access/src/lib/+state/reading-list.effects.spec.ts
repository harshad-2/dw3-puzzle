import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { createBook, createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { AppConstants, Book, ReadingListItem } from '@tmo/shared/models';
import { Action } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ToReadEffects', () => {
  let actions: Observable<Action>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule, MatSnackBarModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = of(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne(AppConstants.API.GET_READING_LIST).flush([]);
    });
  });

  describe('undoAddBook$', () => {
    it('should undo addition of a book', (done) => {
      const book: Book = { ...createBook('A') };
      actions = of(
        ReadingListActions.confirmedAddToReadingList({book: book, showSnackBar: true})
      );
      effects.undoAddBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.showSnackBar({ actionType: AppConstants.SNACKBAR.ADD, item: { bookId: book.id, ...book }})
        );
        done();
      });
    });
  });

  describe('undoRemoveBook$', () => {
    it('should undo removal of a book', (done) => {
      const item: ReadingListItem = createReadingListItem('A');
      actions = of(
        ReadingListActions.confirmedRemoveFromReadingList({item: item, showSnackBar: true})
      );
      effects.undoRemoveBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.showSnackBar({actionType: AppConstants.SNACKBAR.REMOVE, item: action.item})
        );
        done();
      });
    });
  });
});
