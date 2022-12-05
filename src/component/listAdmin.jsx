import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { UserContext } from "./context/auth";
import { GetDataByUser } from "./hooks/query";

function ListAdmin() {
  const { logout, user, count, handleCount, token, setToken } =
    useContext(UserContext);

  const { data, isLoading, isError } = GetDataByUser("books", jwtDecode(token).username);
  console.log(data)
  
  setToken(window.localStorage.getItem('login'))

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              id
            </th>
            <th scope="col" className="py-3 px-6">
              title
            </th>
            <th scope="col" className="py-3 px-6">
              description
            </th>
            <th scope="col" className="py-3 px-6">
              genre
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>

    {isLoading
        ? "Loading..."
        : isError
        ? "Error!"
        : data
        ? data["hydra:member"].map((book) => (
            
         

      
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="py-4 px-6">Sliver</td>
            <td className="py-4 px-6">Laptop</td>
            <td className="py-4 px-6">$2999</td>
            <td className="py-4 px-6">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
       
    ))
    : null}
     </tbody>
      </table>
    </div>

  );
}

export default ListAdmin;
