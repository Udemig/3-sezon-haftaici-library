import React from "react";

import Header from "../components/Header";

import { useSelector } from "react-redux";

const ListCategories = () => {
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log(categoriesState);
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
                <button className="btn btn-primary">Kategori Ekle</button>
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
                    <td>{category.name}</td>
                    <td>
                      {
                        booksState.books.filter(
                          (item) => item.categoryId === category.id
                        ).length
                      }
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger">Sil</button>
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
    </div>
  );
};

export default ListCategories;
