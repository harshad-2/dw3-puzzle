import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { ReadingListItem, AppConstants } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>(AppConstants.API.GET_READING_LIST).pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book, showSnackBar }) =>
        this.http.post(AppConstants.API.GET_READING_LIST, book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book, showSnackBar })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item, showSnackBar }) =>
        this.http.delete(`${AppConstants.API.GET_READING_LIST}/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item, showSnackBar })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  undoAddBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      filter((action) => action.showSnackBar),
      map((action) =>
        ReadingListActions.showSnackBar({
          actionType: AppConstants.SNACKBAR.ADD,
          item: { bookId: action.book.id, ...action.book }
        })
      )
    )
  );

  undoRemoveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      filter((action) => action.showSnackBar),
      map((action) =>
        ReadingListActions.showSnackBar({
          actionType: AppConstants.SNACKBAR.REMOVE,
          item: action.item
        })
      )
    )
  );

  openSnackBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.showSnackBar),
      switchMap((action) => {
        const title = action.item.title;
        const { actionType, item } = action;
        return this.snackBar
          .open(
            actionType === AppConstants.SNACKBAR.ADD 
              ? `${AppConstants.SNACKBAR.ADDED_BOOK} ${title}` 
              : `${AppConstants.SNACKBAR.REMOVED_BOOK} ${title}`
            , AppConstants.SNACKBAR.UNDO,
            { duration:  3000 }
          )
          .onAction().pipe(map(() =>
              actionType === AppConstants.SNACKBAR.ADD
                ? ReadingListActions.removeFromReadingList({item, showSnackBar: false})
                : ReadingListActions.addToReadingList({book: { id: item.bookId, ...item }, showSnackBar: false})
            )
          );
      })
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient, private snackBar: MatSnackBar) {}
}
