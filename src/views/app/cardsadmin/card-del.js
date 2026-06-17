import React, { useState,useEffect } from 'react';
import { useHistory ,useParams } from "react-router-dom";
 
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
 
const DeleteClientModal = () => {
  const { id }= useParams();
  const apiUrl = `${servicePath2}/smartcards/${id}`;
  const history = useHistory();
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .delete(apiUrl)
      .then((res) => {
        if (res){
          setStatus( 'Delete successful' );
        }
        history.push("/app/cards/cards-list");
        
      }).catch(error => {
        setErrorMessage(error.message);
        console.error('There was an error!', error);
    })
 
  }, []);
 
  return !errorMessage ? (
    <div />
  ) : (
    <div className="card text-center m-3">
        <h5 className="card-header">DELETE Request with Error Handling</h5>
        <div className="card-body">
            Error: {errorMessage}
            status: {status}
        </div>
    </div>
);
 
 

   
};
 
export default DeleteClientModal;
