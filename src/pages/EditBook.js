import React, { useState } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditBook = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(params);
  const { booksState, categoriesState } = useSelector((state) => state);
  const myBook = booksState.books.find((item) => item.id === params.bookId);
  //console.log(myBook);
  const [form, setForm] = useState(myBook);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    /* validation */
    if (!form.title || !form.author || !form.isbn || !form.publisher) {
      alert("Bütün alanlar zorunludur");
      return;
    }
    api
      .put(`${urls.books}/${params.bookId}`, form)
      .then((res) => {
        dispatch({ type: actionTypes.bookTypes.EDIT_BOOK, payload: form });
        navigate("/");
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adı<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Sineklerin Tanrısı"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Yazarı<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="William Golding"
              value={form.author}
              onChange={(event) =>
                setForm({ ...form, author: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Yayın Evi<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="İş Bankası Yayınları"
              value={form.publisher}
              onChange={(event) =>
                setForm({ ...form, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="isbn"
              placeholder="xxxxxxxxxxx"
              value={form.isbn}
              onChange={(event) => {
                if (event.target.value.length <= 11) {
                  setForm({ ...form, isbn: event.target.value });
                }
              }}
            />
          </div>
          <select
            value={form.categoryId}
            onChange={(event) =>
              setForm({ ...form, categoryId: event.target.value })
            }
            className="form-select"
            aria-label="Default select example">
            {categoriesState.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="form-check my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value={form.isRead}
              checked={form.isRead}
              onChange={() => setForm({ ...form, isRead: !form.isRead })}
              id="isRead"
            />
            <label className="form-check-label" htmlFor="isRead">
              Bu kitabı okudum
            </label>
          </div>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-secondary w-50" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
