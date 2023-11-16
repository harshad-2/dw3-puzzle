import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { items: {} } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getReadingList, [{...createReadingListItem('cookBook')}]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeFromReadingList', () => {
    const spy = spyOn(store, 'dispatch');
    const item = { ...createReadingListItem('cookBook') };
    const removeBook: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testing="remove-book"]');
    removeBook.click();
    expect(spy).toHaveBeenCalledWith(removeFromReadingList({item: item, showSnackBar: true}));
  });

});