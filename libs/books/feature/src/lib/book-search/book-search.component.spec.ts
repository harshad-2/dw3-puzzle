import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { searchBooks, getAllBooks } from '@tmo/books/data-access';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { books: { entities: [] }, items: {} } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getAllBooks, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call searchBooks', () => {
    const spy = spyOn(store, 'dispatch');
    component.searchForm.value.term = 'cook';
    fixture.detectChanges();
    const search = fixture.nativeElement.querySelector('[data-testing="search-books"]');
    search.click();
    expect(spy).toHaveBeenCalledWith(searchBooks({ term: 'cook' }));
  });

});