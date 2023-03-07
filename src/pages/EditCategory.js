import React, { useState } from "react";

import Header from "../components/Header";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { upperFirstLetters } from "../utils/functions";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

import GeneralModal from "../components/GeneralModal";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { categoriesState } = useSelector((state) => state);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === categoryId
  );

  const [form, setForm] = useState(myCategory);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    title: "",
    type: "",
  });

  const handleEdit = (event) => {
    event.preventDefault();
    /* falsy ("",null,undefined,false) - truthy (true,["dfg"],{name:"gdf"}) */
    if (!form.name) {
      setNotification({
        show:true,
        message:"Kategori adı boş bırakılamaz",
        title:"Hata",
        type:"error"
      })
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => upperFirstLetters(item.name) === upperFirstLetters(form.name)
    );
    if (hasCategory) {
      setNotification({
        show:true,
        message:`${form.name} adıyla bir kategori kaydı zaten vardır.`,
        title:"Hata",
        type:"error"
      })
      return;
    }
    api
      .put(`${urls.categories}/${categoryId}`, {
        ...form,
        name: upperFirstLetters(form.name).trim(),
      })
      .then((res) => {
        dispatch({
          type: actionTypes.categoryTypes.EDIT_CATEGORY,
          payload: form,
        });
        setNotification({
            show:true,
            title:'Başarılı',
            message:"Kategori güncelleme işlemi başarıyla gerçekleşti",
            type:"success"
        })
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleEdit}>
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
            <button
              disabled={
                upperFirstLetters(myCategory.name) ===
                upperFirstLetters(form.name).trim()
              }
              className="btn btn-secondary w-50"
              type="submit">
              Güncelle
            </button>
          </div>
        </form>
      </div>
      {notification.show && (
        <GeneralModal
          title={notification.title}
          content={notification.message}
          buttonText={
            notification.type === "error" ? "Kapat" : "Kategorilere Dön"
          }
          buttonOnClick={() => {
            if (notification.type === "error") {
              setNotification({ ...notification, show: false });
            } else {
              navigate("/list-categories");
            }
          }}
        />
      )}
    </div>
  );
};

export default EditCategory;
