import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    /* 1. kategori adı boş bırakılmasın */
    /* 2. daha önceden kaydedilmiş kategori adı tekrar kaydedilemesin */
    if (form.name === "") {
      alert("Kategori adı boş bırakılamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) =>
        item.name.toLocaleLowerCase("tr-TR") ===
        form.name.toLocaleLowerCase("tr-TR")
    );
    if (hasCategory !== undefined) {
      alert(`${form.name} adıyla bir kategori kaydı zaten vardır.`);
      return;
    }
    api
      .post(urls.categories, form)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryTypes.ADD_CATEGORY,
          payload: form,
        });
        navigate("/list-categories");
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kategori Adı<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Roman"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
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

export default AddCategory;
