import React, { useState , useEffect} from 'react';
import { connect } from 'react-redux';
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
import { addUserItem } from 'redux/actions';
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { servicePath2 } from 'constants/defaultValues';
import axios from 'axios';

const apiUrl = `${servicePath2}/companies/codelist`;
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);
const AddNewUserModal = ({
  addUserItemAction, intl, match, currentUser
}) => {
  const initialState = {
    id: null,
    username: "",
    password: "",
    email: "",
    company_id: currentUser.companyId,
    companies: [],
    status: true,
  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
 
  const [options, setOptions] = useState([]);
  const [enabled, setEnabled] = useState(true);
  

  const addNetItem = async (e) => {
    e.preventDefault();
    setEnabled(false);
    if (state.company_id ===undefined) {
      state.company_id= currentUser.companyId;
    }
    const newItem = {
      username: state.username,
      password: state.password,
      email: state.email,
      status: state.status,
      company_id: state.company_id,
      "roles" : ["user"],
    };
   
    addUserItemAction(newItem);
    setState(initialState);
    await delay(1000);
    history.push("/app/users/users-list");
 
  };
  const { messages } = intl;

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

  useEffect(() => {
   
    fetchData();
  },[]);
     
  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.users-add" match={match} />
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
                    value={state.password || ''}
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
                <Button color="primary" className="mt-4" onClick={(e) => addNetItem(e)} disabled={!enabled}>
                  <IntlMessages id="forms.submit" />
                </Button>
              </Form>


            </CardBody>
          </Card>
        </Colxx>
      </Row>


    </>
  );
};
const mapStateToProps = ({ userListApp , authUser}) => {
  const { companies } = userListApp;
  const { currentUser } = authUser;
  return {
    companies,
    currentUser
  };
};
export default injectIntl(connect(mapStateToProps, {
  addUserItemAction: addUserItem,
})(AddNewUserModal));
