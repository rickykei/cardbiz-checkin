import http from "http-common";

const getAll = () => {
  return http.get("/staffs");
};

const get = id => {
  return http.get(`/staffs/${id}`);
};

const findByStaffDocID = (id,companyid) =>{
  return http.get(`/staffs/findByStaffDocID?id=${id}&companyId=${companyid}`);
};

const findByUserProfile = id => {
  return http.get(`/staffs/findByUserProfile?id=${id}`);
};


const create = data => {
  return http.post("/staffs", data);
};

const update = (id, data) => {
  return http.post(`/staffs/${id}`, data);
};

const remove = id => {
  return http.delete(`/staffs/${id}`);
};

const removeAll = () => {
  return http.delete(`/staffs`);
};

const findByName = name => {
  return http.get(`/staffs?name=${name}`);
};

const StaffsService = {
  getAll,
  get,
  findByStaffDocID,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findByUserProfile
};

export default StaffsService;
