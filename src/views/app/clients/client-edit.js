import React, { useState , useEffect} from 'react';

import { injectIntl } from 'react-intl';
import { CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form,  InputGroup,InputGroupAddon} from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

import Breadcrumb from 'containers/navs/Breadcrumb';

import ClientDataService from 'services/ClientsService';

import { useParams,useHistory } from "react-router-dom";


const EditClientModal = ({ intl, match, }) => {

  const { id } = useParams();
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    smartcard_uid: "",
    status: true,
  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);


  const getClient = (aa) => {
    ClientDataService.get(aa)
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
    getClient(id);
  }, [id]);

  const updateClient = (e) => {
    setIsDisabled(true);  
    e.preventDefault();

    ClientDataService.update(state.id, state)
      .then(response => {
        console.log(response.data);
        setMessage("The client was updated successfully!");
        setIsDisabled(false); // <--- here
        history.push("/app/clients/clients-list");
      })
      .catch(f => {
        console.log(f);
      });
  };
  
  const { messages } = intl;
  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.clients-edit" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form>
                <FormGroup>
                  <Label for="clientName">
                    <IntlMessages id="forms.client-name" />
                  </Label>
                  <Input
                    type="text"
                    value={state.name || ''}
                    onChange={(val) => setState({ ...state, name: val.target.value })}
                    placeholder={messages['forms.client-name']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.email-muted" />
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="clientCode">
                    <IntlMessages id="forms.client-code" />
                  </Label>
                  <Input
                    type="text"
                    value={state.code || ''}
                    onChange={(val) => setState({ ...state, code: val.target.value })}
                    placeholder={messages['forms.client-code']}

                  />
                </FormGroup>

                <FormGroup>
                  <Label for="clientNoOfLiscense">
                    <IntlMessages id="forms.client-no_of_license" />
                  </Label>
                  <Input
                    type="text"
                    value={state.no_of_license || ''}
                    onChange={(val) => setState({ ...state, no_of_license: val.target.value })}
                    placeholder={messages['forms.client-no_of_license']}

                  />
                </FormGroup>

                <FormGroup>
                  <Label for="clientNoOfAdmin">
                    <IntlMessages id="forms.client-no_of_admin" />
                  </Label>
                  <Input
                    type="text"
                    value={state.no_of_admin || ''}
                    onChange={(val) => setState({ ...state, no_of_admin: val.target.value })}
                    placeholder={messages['forms.client-no_of_admin']}

                  />
                </FormGroup>

                <InputGroup>
                <InputGroupAddon addonType="prepend">
                smartcard.uid[,]
                </InputGroupAddon>
                <Input type="textarea" name="smartcard_uid" value={state.smartcard_uid || ''} onChange={(val) => setState({ ...state, smartcard_uid: val.target.value })}/>
              </InputGroup>


                <FormGroup>
                  <Label>
                    <IntlMessages id="forms.client-status" />
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
                        status: event.target.value === 'on' ,
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
                        status: event.target.value !== 'on' ,
                      })
                    }
                  />


                </FormGroup>
                <Button color="primary" className="mt-4" onClick={(e) => updateClient(e)} disabled={isDisabled}>
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
 
export default injectIntl(EditClientModal);
