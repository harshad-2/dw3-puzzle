import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should update searchterm value for any input changes', () => {
    const app = fixture.debugElement.componentInstance;
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'cook';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(app.searchTerm).toBe('cook');
  });

  it('should invoke api only after 500ms and should not invoke api if input is cleared', fakeAsync(() => {
    spyOn(component, 'searchBooks').and.callThrough();
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'cook';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchBooks).not.toHaveBeenCalled();
    tick(500);
    expect(component.searchBooks).toHaveBeenCalledTimes(1);
  }));
  
});