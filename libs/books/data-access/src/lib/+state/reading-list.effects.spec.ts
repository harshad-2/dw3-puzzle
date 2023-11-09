import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';
import { Update } from '@ngrx/entity';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
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
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });

    it('should invoke finshed api to mark a finished book', (done) => {
      const item: ReadingListItem = createReadingListItem('cookBook');
      const finishedDate = new Date().toISOString();
      actions = new ReplaySubject();
      actions.next(ReadingListActions.markBookAsFinished({ item }));
      const updateItem: Update<ReadingListItem> = {
        id: 'cookBook',
        changes: { finished: true, finishedDate: finishedDate },
      };
      effects.markBookFinished$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.confirmedMarkBookAsFinished({ updateItem })
        );
        done();
      });
      httpMock.expectOne('/api/reading-list/cookBook/finished').flush({ ...item, finished: true, finishedDate: finishedDate });
    });

  });
});