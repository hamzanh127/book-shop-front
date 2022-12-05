import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isError, useMutation, useQuery , useQueryClient } from "react-query";
import axios from "axios";


// get all data
export const FetchData = (entity) => {
  const [data, setData] = useState();

  const fetchBooks = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/api/${entity}`);
    return result.data;
  };
  const {
    data: result,
    isLoading,
    isError,
    refetch,
  } = useQuery([entity], fetchBooks, {
    onSuccess: (result) => {
      setData(result);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { data, isError, isLoading, refetch };
};

// get data by id
export const DetailData = (entity, id) => {
  const [dataD, setDataD] = useState();

  const { data, isLoading, isError, refetch } = useQuery([entity, id], () =>
    fetchBookD(id)
  );

  const fetchBookD = async (id) => {
    const result = await axios.get(`http://127.0.0.1:8000/api/${entity}/${id}`);
    return result.data;
  };

  return { data, isError, isLoading, refetch };
};

// update data
export const UseUpdateDate = (entity, id, data) => {
  const UpdateData = axios.put(
    `http://127.0.0.1:8000/api/${entity}/${id}`,
    data
  );
  return useMutation(UpdateData);
};

export const FnUpdate = (entity, id) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (data) => {
      return axios.put(`http://127.0.0.1:8000/api/${entity}/${id}`, data);
    }, 
    onSuccess :() => {
      queryClient.invalidateQueries({ queryKey: [entity] })

    }
  });

  return { mutate, isLoading, isSuccess };
};

// get data by title
export const GetDataByTitle = (entity, title) => {
  const [dataT, setDataD] = useState();

  const { data, isLoading, isError, refetch } = useQuery([entity, title], () =>
    fetchBookT(title)
  );

  const fetchBookT = async (title) => {
    const result = await axios.get(`http://127.0.0.1:8000/api/${entity}?title=${title ? title : ""}`);
    return result.data;
  };

  return { data, isError, isLoading, refetch };
};

// get data by user
export const GetDataByUser = (entity, user) => {
  // const [dataT, setDataD] = useState();

  const { data, isLoading, isError, refetch } = useQuery([entity, user], () =>
    fetchBookUser(user)
  );

  const fetchBookUser = async (user) => {
    const result = await axios.get(`http://127.0.0.1:8000/api/${entity}?user.username=${user}`);
    return result.data;
  };

  return { data, isError, isLoading, refetch };
};
