import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";

import axios from "axios";
import actionTypes from "./redux/actions/actionTypes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch books
    dispatch({ type: actionTypes.bookTypes.FETCH_BOOKS_START });
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        dispatch({
          type: actionTypes.bookTypes.FETCH_BOOKS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookTypes.FETCH_BOOKS_FAIL,
          payload: "Kitaplar çekilirken bir hata oluştu",
        });
      });
    //fetch categories
    dispatch({ type: actionTypes.categoryTypes.FETCH_CATEGORIES_START });
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        dispatch({
          type: actionTypes.categoryTypes.FETCH_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryTypes.FETCH_CATEGORIES_FAIL,
          payload: "Kategoriler çekilirken hata oluştu"
        })
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
