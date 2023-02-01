import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

import GeneralModal from "./GeneralModal";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    categoryId: categoriesState.categories[0].id,
    isRead: false,
  });
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (!form.title || !form.author || !form.isbn || !form.publisher) {
      alert("Bütün alanlar zorunludur");
      return;
    }
    /* http://localhost:3004/books */
    api
      .post(urls.books, form)
      .then((res) => {
        dispatch({ type: actionTypes.bookTypes.ADD_BOOK, payload: form });
        setShowModal(true)
      })
      .catch((err) => {});
  };
  return (
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
      {showModal === true && (
        <GeneralModal
          title={"Başarılı"}
          content="Kitap başarıyla kaydedildi"
          buttonText={"Kapat"}
          buttonOnClick={()=>navigate("/")}
        />
      )}
    </div>
  );
};

export default AddBookForm;
