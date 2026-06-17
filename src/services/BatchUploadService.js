import http from "http-common";

const staffbatchupload = data => {
  return http.post("/batch_upload/uploadStaffExcel", data);
};
 
const BatchUploadService = {
    staffbatchupload
};

export default BatchUploadService;
