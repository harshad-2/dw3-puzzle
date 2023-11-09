export const AppConstants = {
    APP_TITLE: 'okreads',
    SEARCH_BOOKS: {
        SEARCH_TIP: 'Search for books to add to your reading list',
        SEARCH_EXAMPLE: 'Try searching for a topic, for example',
        JAVASCRIPT: 'JavaScript',
        AUTHOR: 'Author',
        PUBLISHER: 'Publisher',
        PUBLISHED: 'Published',
        DESCRIPTION: 'Book description',
        NOT_AVAILABLE: 'N/A',
        WANT_TO_READ: 'Want to Read',
        DATE_FORMAT: 'M/d/yyyy',
        ERROR: 'No books found. Please try another keyword',
        FINISHED: 'Finished',
    },
    READING_LIST_SECTION: {
        EMPTY: "You haven't added any books to your reading list yet.",
        FINISHED_READING_ON: 'Finished reading on',
        DATEFORMAT: 'M/d/yy hh:mm a',
    },
    API: {
        GET_BOOKS: '/api/books/search?q=',
        GET_READING_LIST: '/api/reading-list',
        PATH_GET_READING_LIST: '/reading-list/',
        PATH_DELETE_READING_LIST: '/reading-list/:id',
        PATH_READING_COMPLETED: '/reading-list/:id/finished',
    },
    ROOT: {
        READING_LIST: 'Reading List',
        MY_READING_LIST: 'My Reading List',
        OKREADS: 'okreads',
    }
}