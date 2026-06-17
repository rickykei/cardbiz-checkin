/* eslint-disable import/no-extraneous-dependencies */
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import StaffDataService from 'services/StaffsService';
/*  eslint-disable-next-line no-unused-vars */
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
  /*  eslint-disable-next-line no-unused-vars */
const DeactiveClientModal = ({currentUser}) => {
  const { id } = useParams();
  /*  eslint-disable-next-line no-unused-vars */
  const apiUrl = `${servicePath2}/staffs/${id}`;
  /*  eslint-disable-next-line no-unused-vars */
  const history = useHistory();
  /*  eslint-disable-next-line no-unused-vars */
  const [status, setStatus] = useState(null);
  /*  eslint-disable-next-line no-unused-vars */
  const [errorMessage, setErrorMessage] = useState(null);
    /*  eslint-disable-next-line no-unused-vars */
  const [message, setMessage] = useState("");
    /*  eslint-disable-next-line no-unused-vars */
  const [isDisabled, setIsDisabled] = useState(false);

  const updateStaff = () => {

    //  e.preventDefault();
    const data = new FormData()
   data.append("uid", currentUser.uid);
   
    data.append("status", true);
    console.log("staff doc id = ");
    console.log(id);
    StaffDataService.update(id, data)
        .then(response => {
          console.log(response.data);
          setMessage("The Staff's status was actived successfully!");
          setIsDisabled(false); // <--- here
          history.push("/app/staffsdeactive/staffs-list");
        })
        .catch(r => {
          console.log(r);
        }); 
  };

  useEffect(() => {
    updateStaff();

  }, []);

  return !errorMessage ? (
    <div />
  ) : (
    <div className="card text-center m-3">
      <h5 className="card-header">Deactive Request with Error Handling</h5>
      <div className="card-body">
        Error: {errorMessage}
        status: {status}
      </div>
    </div>
  );




};
const mapStateToProps = ({ authUser }) => {

  const { currentUser } = authUser;
  return {

    currentUser
  };
};
export default injectIntl(connect(mapStateToProps)(DeactiveClientModal));  
