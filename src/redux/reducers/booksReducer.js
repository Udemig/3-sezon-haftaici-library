import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  books: [],
  fail: false,
  error: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bookTypes.FETCH_BOOKS_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.bookTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        start: false,
        fail: false,
        success: true,
        books: action.payload,
      };
    case actionTypes.bookTypes.FETCH_BOOKS_FAIL:
      return {
        ...state,
        start: false,
        succes: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.bookTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case actionTypes.bookTypes.DELETE_BOOK:
      var filteredBooks = state.books.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        books: filteredBooks,
      };
    case actionTypes.bookTypes.EDIT_BOOK:
      let tempArray = [];
      for (let i = 0; i < state.books.length; i++) {
        if (state.books[i].id === action.payload.id) {
          tempArray.push(action.payload);
        } else {
          tempArray.push(state.books[i]);
        }
      }
      return {
        ...state,
        books: tempArray,
      };
    case actionTypes.bookTypes.DELETE_BOOKS_AFTER_CATEGORY_DELETE:
      var filteredBooks = state.books.filter(
        (item) => item.categoryId !== action.payload
      );
      return {
        ...state,
        books: filteredBooks,
      };
    default:
      return state;
  }
};

export default booksReducer;
