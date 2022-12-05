import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Navbar from "./component/navbar";
import "./index.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import 'flowbite'
import { UserProvider } from "./component/context/auth";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
    <UserProvider>
        <App />
        </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
