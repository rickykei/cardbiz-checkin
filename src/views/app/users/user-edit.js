/* eslint-disable import/no-extraneous-dependencies */
import React, { useState , useEffect} from 'react';

import { injectIntl } from 'react-intl';
import { CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, } from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

import Breadcrumb from 'containers/navs/Breadcrumb';

import UserDataService from 'services/UsersService';
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
import { useParams,useHistory } from "react-router-dom";
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

const apiUrl = `${servicePath2}/companies/codelist`;

const EditUserModal = ({ intl, match, }) => {

  const { id } = useParams();
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    password: "",
    status: true,
    company_id: "",
  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const getUser = (aa) => {
    UserDataService.get(aa)
      .then(response => {
        setState(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    if (id)
    getUser(id);
  }, [id]);

   
  async function fetchData() {
    axios.get(`${apiUrl}`)
      .then(({data}) => {
        const option = data.map((item)=>({
          "value" : item.value,
          "label" : item.label,
      }))
        setOptions(option);
          
      })
      .catch(error => {
        console.error('Companies code error!', error);
      })
  }

  const updateUser = (e) => {
    setIsDisabled(true);  
    e.preventDefault();
    UserDataService.update(state.id, state)
      .then(response => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
        setIsDisabled(false); // <--- here
        history.push("/app/users/users-list");
      })
      .catch(r => {
        console.log(r);
      });
  };
  useEffect(() => {
   
    fetchData();
  },[]);
     

  const { messages } = intl;
  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.user-edit" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form>
              <FormGroup>
                  <Label for="username">
                    <IntlMessages id="forms.user-username" />
                  </Label>
                  <Input
                    type="text"
                    value={state.username || ''}
                    onChange={(val) => setState({ ...state, username: val.target.value })}
                    placeholder={messages['forms.user-username']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.user-username-muted" />
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="email">
                    <IntlMessages id="forms.user-email" />
                  </Label>
                  <Input
                    type="email"
                    value={state.email || ''}
                    onChange={(val) => setState({ ...state, email: val.target.value })}
                    placeholder={messages['forms.user-email']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.user-email-muted" />
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="password">
                    <IntlMessages id="forms.user-password" />
                  </Label>
                  <Input
                    type="password"
                   
                    onChange={(val) => setState({ ...state, password: val.target.value })}
                    placeholder={messages['forms.user-password']}

                  />
                </FormGroup>

                <FormGroup>
                  <Label className="mt-4">
                    <IntlMessages id="forms.user-company" />
                  </Label>
                 <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-company"
                    options={options}
                    value={options.find(obj => {
                      return obj.value === state.company_id;
                    })}
                    onChange={(val) => setState({ ...state, company_id: val.value })}
                    
                  />
                </FormGroup>


                <FormGroup>
                  <Label>
                    <IntlMessages id="forms.user-status" />
                  </Label>
                  <CustomInput
                    type="radio"
                    id="exCustomRadio2"
                    name="customRadio2"
                    label="Active"
                    checked={state.status === true}
                    onChange={(event) =>
                      setState({
                        ...state,
                        status: event.target.value === 'on',
                      })
                    }
                  />


                  <CustomInput
                    type="radio"
                    id="exCustomRadio"
                    name="customRadio"
                    label="Disable"
                    checked={state.status === false}
                    onChange={(event) =>
                      setState({
                        ...state,
                        status: event.target.value !== 'on',
                      })
                    }
                  />


                </FormGroup>
                <Button color="primary" className="mt-4"  onClick={(e) => updateUser(e)} disabled={isDisabled}>
                  <IntlMessages id="forms.submit" />
                </Button>
                <p>{message}</p>
              </Form>


            </CardBody>
          </Card>
        </Colxx>
      </Row>


    </>
  );
};
 
export default injectIntl(EditUserModal);
