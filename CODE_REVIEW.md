# Code smells:
- Formatdate() method used instead of a date pipe - Fixed
- Error hook not handled for book search - Fixed
- Removed empty OnInit from total.component - Fixed
- total.component.scss is empty - Deleted
- Deprecated <strong> tags used - Fixed

# Improvements:
- Used trackBy in ngFor to optimize screen update for any change in value - Fixed
- Used async pipe to load books - Done
- Constants not used throughout the app - Done

# Other seen issues not fixed
- Spinner missing when book search is in progress
- Form is not validated
- Javascript anchor tag can be made as a button
- Missing clear button for the input
- Test cases missing for ReadingListComponent and BookSearchComponent
- Return type not mentioned for many methods
- Naming conventions not followed properly
- UI not responsive

# Fixed two lighthouse issues:
- Label for search button
- Text and background contrast for readability

# Fixed three accessibility issues found manually:
- Book cover image alt not provided
- Alternate text missing for book fields
- Aria labels missing in book search component
- Hover and focus colors added for Want to Read button to allow accessible keyboard based navigation
- Added similar highlight for My reading list button