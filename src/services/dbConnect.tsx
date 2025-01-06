import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type ApiResponse<T> = {
  state: "success" | "error";
  data: any;
};

type ApiRequestState<T> = {
  data: any;
  error: any;
  loading: boolean;
};

// Renaming appApi to useAppApi to follow React Hook naming conventions
export const useAppApi = <T,>() => {
  const [state, setState] = useState<ApiRequestState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const postData = async (url: string, postData: any): Promise<ApiResponse<T>> => {
    setState({ data: null, error: null, loading: true });
    try {

      axios.defaults.headers.common['Content-type'] = 'application/json';
      const response: AxiosResponse<T> = await axios.post(url, postData);
      setState({ data: response.data, error: null, loading: false });
      return {
        state: "success",
        data: response.data,
      };
    } catch (e) {
      const errorMessage = (e as Error).message;
      setState({ data: null, error: errorMessage, loading: false });
      return {
        state: "error",
        data: errorMessage,
      };
    }
  };

  const getData = async (url: string): Promise<ApiResponse<T>> => {
    setState({ data: null, error: null, loading: true });
    try {
      
      axios.defaults.headers.common['Content-type'] = 'application/json';
      const response: AxiosResponse<T> = await axios.get(url);
      setState({ data: response.data, error: null, loading: false });
      return {
        state: "success",
        data: response.data,
      };
    } catch (e) {
      const errorMessage = (e as Error).message;
      setState({ data: null, error: errorMessage, loading: false });
      return {
        state: "error",
        data: errorMessage,
      };
    }
  };

  const updateData = async (url: string, postData: any): Promise<ApiResponse<T>> => {
    setState({ data: null, error: null, loading: true });
    try {
      
      axios.defaults.headers.common['Content-type'] = 'application/json';
      const response: AxiosResponse<T> = await axios.put(url, postData);
      setState({ data: response.data, error: null, loading: false });
      return {
        state: "success",
        data: response.data,
      };
    } catch (e) {
      const errorMessage = (e as Error).message;
      setState({ data: null, error: errorMessage, loading: false });
      return {
        state: "error",
        data: errorMessage,
      };
    }
  };

  const deleteData = async (url: string): Promise<ApiResponse<T>> => {
    setState({ data: null, error: null, loading: true });
    try {
      
      axios.defaults.headers.common['Content-type'] = 'application/json';
      const response: AxiosResponse<T> = await axios.delete(url);
      setState({ data: response.data, error: null, loading: false });
      return {
        state: "success",
        data: response.data,
      };
    } catch (e) {
      const errorMessage = (e as Error).message;
      setState({ data: null, error: errorMessage, loading: false });
      return {
        state: "error",
        data: errorMessage,
      };
    }
  };

  return { state, postData, getData, updateData, deleteData };
};
