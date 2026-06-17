/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
 
import { injectIntl } from 'react-intl';
import {
  CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form,
 
} from 'reactstrap';
import Select from 'react-select';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import Breadcrumb from 'containers/navs/Breadcrumb';

import { useHistory } from "react-router-dom";
import { servicePath2 } from 'constants/defaultValues';
import axios from 'axios';
import CustomSelectInput from 'components/common/CustomSelectInput';
import CardDataService from 'services/CardsService';


 
const apiUrl = `${servicePath2}/companies/codelist`;

const AddNewCardModal = ({
    intl, match
}) => {

  const initialState  = {
    id: null,
    uid: "",
    company_id: "",
    updated_by: "630cf0461fa3f166eb3dee01",
    created_by: "630cf0461fa3f166eb3dee01",
    status: true,
    
  };
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const [options, setOptions] = useState([]);
  const [state, setState] = useState(initialState);
  const history = useHistory();
 
  const addNetItem = () => {
    const newItem = {
      uid: state.uid,
      status: state.status,
      company_id: selectedOptionLO.value,
    }
    
    CardDataService.create(newItem)
    .then(response => {
      console.log(response.data);
       
      history.push("/app/cards/cards-list");
    })
    .catch(e => {
      console.log(e);
    });
  
    setState(initialState);
  };
 
  const { messages } = intl;

  async function fetchData() {
    axios.get(`${apiUrl}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {

        setOptions(
          data
        );
      })
      .catch(error => {

        console.error('There was an error!', error);
      })


  }

  useEffect(() => {

    fetchData();
  }, []);

  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.cards-add" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form> 

              <FormGroup>
                  <Label className="mt-4">
                    <IntlMessages id="forms.user-company" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={options}
                    value={selectedOptionLO}
                    onChange={(val) => setSelectedOptionLO(val)}
                  />
                </FormGroup>

                 
                    <FormGroup>
                      <Label for="uid">
                        <IntlMessages id="forms.smartcard-uid" />
                      </Label>
                      <Input
                        type="text"
                        value={state.uid || ''}
                        onChange={(val) => setState({ ...state, uid: val.target.value })}
                        placeholder={messages['forms.smartcard-uid']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.smartcard-muted" />
                      </FormText>
                    </FormGroup>

                  
 
                <Row>
                
                  <Colxx xxs="12" md="6">
                <FormGroup>
                  <Label>
                    <IntlMessages id="forms.smartcards-status" />
                  </Label>
                  <CustomInput
                    type="radio"
                    id="exCustomRadio3"
                    name="customRadio3"
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
                    id="exCustomRadio4"
                    name="customRadio4"
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

                </Colxx>
                </Row>
                <Button color="primary" className="mt-4" onClick={() => addNetItem()}>
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
 
export default injectIntl((AddNewCardModal));
