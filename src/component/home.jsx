import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import booksimg from "../booksimg.png";
import { FetchData, GetDataByTitle } from "./hooks/query";

function Home() {
  // ----------- start useState ----------

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({ title: "" });

  // -----------  end useState  -----------

  // ----------- start getBooks -----------

  const { data, isLoading, isError } = GetDataByTitle("books", search.title);
  console.log(search.title);
  // ------------ end getBooks ------------
  // ------------ start handle title ------
  const newData = { ...search };

  function handle(e) {
    newData[e.target.id] = e.target.value;
    console.log(newData);
  }

  // ------------ end handle title --------
  // ------- start get book by title ------

  // const { data : bookByTitle , isLoading :isLoadingByTitle , isError :isErrorByTitle } = GetDataByTitle('books',{search})
  // console.log(GetDataByTitle('books',{search}))

  // -------- end get book by title -------

  return (
    <div className="home mt-20">
      <div className="search2 flex place-content-center ">
        <div className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              id="title"
              onChange={(e) => {
                handle(e);
                newData.title === "" && setSearch({ title: "" });
              }}
              defaultValue={search.title}
              required
            />
          </div>

          {search.title !== "" ? (
            <>
              <button
                type="button"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  setSearch({
                    title: "",
                  });
                  document.getElementById("title").value = "";
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  setSearch(newData);
                  console.log(search);
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>{" "}
                <span className="sr-only">Search</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="section-book">
        <div className="flex flex-wrap  ">
            {isLoading
              ? "Loading..."
              : isError
              ? "Error!"
              : data
              ? data["hydra:member"].map((book) => (
                  <div
                    key={book.id}
                    className="w-full m-2 max-w-sm bg-gray rounded-lg shadow-md dark:bg-gray-800  dark:border-gray-700"
                  >
                    <div className="place-content-center flex">
                      <img
                        className="p-8 rounded-t-lg w-40 h-40"
                        src={booksimg}
                        alt="product image"
                      />
                    </div>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {book.title}
                        </h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <h6>{book.description}</h6>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {book.genre}
                        </span>
                        <a
                          href="#"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
