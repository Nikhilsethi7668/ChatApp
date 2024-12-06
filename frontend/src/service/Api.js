import axios from "axios";

const url = "http://localhost:8000";
export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data);
  } catch (error) {
    console.log(error.message);
  }
};
export const getusers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("Error while calling SetConversation API", error.message);
  }
};
export const getConversation = async (users) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, users);
    return response.data;
  } catch (error) {
    console.log("Error while calling getConversation in frontend", error);
  }
};

export const newMessage = async (message) => {
  try {
    await axios.post(`${url}/message/add`, message);
  } catch (error) {
    console.log("Error while calling newMessage api", error.message);
  }
};
export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getMessages", error.message);
  }
};
export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log("Error while calling uploadFile api", error.message);
  }
};
