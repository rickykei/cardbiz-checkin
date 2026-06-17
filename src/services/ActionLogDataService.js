import http from "http-common";

const getByAdminId = id => {
  return http.get(`/action_logs/getByAdminId?pageSize=100&currentPage=1&uid=${id}`);
};
const getByStaffId = id => {
  return http.get(`/action_logs/getByStaffId?pageSize=100&currentPage=1&staffId=${id}`);
};
 
const ActionLogDataService = {
  getByAdminId,
  getByStaffId,
};
export default ActionLogDataService;
