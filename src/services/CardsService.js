
import http from "http-common";

const getAll = () => {
  return http.get("/smartcards");
};

const get = id => {
  return http.get(`/smartcards/${id}`);
};

const create = data => {
  return http.post("/smartcards", data);
};

const update = (id, data) => {
  return http.put(`/smartcards/${id}`, data);
};

const remove = id => {
  return http.delete(`/smartcards/${id}`);
};

const removeAll = () => {
  return http.delete(`/smartcards`);
};

const findByName = name => {
  return http.get(`/smartcards?name=${name}`);
};

const CardsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default CardsService;
