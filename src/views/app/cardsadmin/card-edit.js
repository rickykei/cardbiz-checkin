import React, { useState , useEffect} from 'react';

import { injectIntl } from 'react-intl';
import { CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, 
 } from 'reactstrap';
 
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import CardDataService from 'services/CardsService';
 
import { useParams,useHistory } from "react-router-dom";
import { servicePath2 } from 'constants/defaultValues';
 



const EditClientModal = ({ intl, match, }) => {


 /* eslint-disable no-unused-vars */
  
  const { id } = useParams();
  const initialState = {
    id: null,
    company_id: "",
    status: true,
  
  };
  const apiUrl = `${servicePath2}/companies/codelist`;

  const [state, setState] = useState(initialState);
  const [options, setOptions] = useState([]);
  const history = useHistory();
 
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
 

  
   

  const getCard = (aa) => {
    CardDataService.get(aa)
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
    getCard(id);
  }, [id]);

  const updateCard = () => {
    if(state.company_id === undefined)
    state.company_id=selectedOptionLO.value;
 
    CardDataService.update(state.id, state)
      .then(response => {
        console.log(response.data);
       
        history.push("/app/cardsadmin/cards-list");
      })
      .catch(e => {
        console.log(e);
      });
  };
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
  }, []);
 
  const { messages } = intl;
 

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
                    name="form-field-company"
                    options={options}
                    value={options.find(obj => {
                      return obj.value === state.company_id;
                    })}
                    onChange={(val) => setState({ ...state, company_id: val.value })}
                    
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
                <Button color="primary" className="mt-4" onClick={() => updateCard()}>
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
 
export default injectIntl(EditClientModal);
