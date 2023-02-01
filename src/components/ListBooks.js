import React from "react";

import {Link} from "react-router-dom"

import { useSelector } from "react-redux";

import check from "../assets/images/check.png"

const ListBooks = () => {
  const { booksState, categoriesState } = useSelector((state) => state);
  console.log(booksState);
  console.log(categoriesState);
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end my-3">
        <Link to={"/add-book"} className="btn btn-primary">Yeni Kitap Ekle</Link> 
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Yazarı</th>
            <th scope="col">Kategori</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((book, index) => {
            const myCategory = categoriesState.categories.find(
              (item) => item.id === book.categoryId
            );
            return (
              <tr key={book.id}>
                <th>{index + 1}{book.isRead === true && <img style={{width:"20px"}} src={check} />}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{myCategory.name}</td>
                <td>
                    <Link to={`/book-detail/${book.id}`}>Detay</Link> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
