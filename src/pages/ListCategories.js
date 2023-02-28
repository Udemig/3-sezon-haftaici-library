import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import GeneralModal from "../components/GeneralModal";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

import { upperFirstLetters } from "../utils/functions";

const ListCategories = () => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [willDeleteCategory, setWillDeleteCategory] = useState("");

  const deleteCategory = (id) => {
    api
      .delete(`${urls.categories}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryTypes.DELETE_CATEGORY,
          payload: id,
        });
        dispatch({
          type: actionTypes.bookTypes.DELETE_BOOKS_AFTER_CATEGORY_DELETE,
          payload: id,
        });
        setOpenDeleteModal(false);
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        {categoriesState.categories.length === 0 && (
          <div className="alert alert-danger text-center" role="alert">
            Henüz kayıtlı bir kategori yok
          </div>
        )}
        {categoriesState.categories.length > 0 && (
          <div>
            <div className="d-flex justify-content-end">
              <Link to={"/add-category"} className="btn btn-primary">
                Kategori Ekle
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sıra No</th>
                  <th scope="col">Kategori Adı</th>
                  <th scope="col">Kitap Sayısı</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categoriesState.categories.map((category, index) => (
                  <tr key={category.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{upperFirstLetters(category.name)}</td>
                    <td>
                      {
                        booksState.books.filter(
                          (item) => item.categoryId === category.id
                        ).length
                      }
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setWillDeleteCategory(category.id);
                        }}
                        className="btn btn-sm btn-danger">
                        Sil
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        Güncelle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {openDeleteModal && (
        <GeneralModal
          title="Kategori Silme"
          content="Kategori silindiğinde bu kategoriye ait bütün kitaplar da silinecektir. Silmek istediğinize emin misiniz?"
          secondaryBtnText="Vazgeç"
          secondaryBtnOnClick={() => setOpenDeleteModal(false)}
          buttonText="Evet, Sil"
          buttonOnClick={() => {
            deleteCategory(willDeleteCategory);
          }}
        />
      )}
    </div>
  );
};

export default ListCategories;
