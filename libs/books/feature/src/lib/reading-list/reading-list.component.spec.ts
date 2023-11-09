import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';
import { getReadingList, removeFromReadingList, markBookAsFinished } from '@tmo/books/data-access';
import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [
        provideMockStore({initialState: {readingList: { entities: [] }}})
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getReadingList, [createReadingListItem('cookBook')]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch markedAsFinished action and mark book as finished when the check button is clicked', () => {
    const spy = spyOn(store, 'dispatch');
    const readingList = createReadingListItem('cookBook');
    const markAsFinishedBtn = fixture.nativeElement.querySelector('[data-testing="mark-as-finished"]');
    markAsFinishedBtn.click();
    expect(spy).toHaveBeenCalledWith(markBookAsFinished({ item: readingList }));
  });
});