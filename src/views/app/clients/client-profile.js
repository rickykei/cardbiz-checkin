import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, } from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import Breadcrumb from 'containers/navs/Breadcrumb';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { addClientItem } from 'redux/actions';
import { useHistory } from "react-router-dom";
 

const AddNewClientModal = ({  
  statuses,
  addClientItemAction, intl,  match,
}) => {
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    status: true,
  };
 const [state, setState] = useState(initialState);
 const history = useHistory();
 
  const addNetItem = () => {
    const newItem = {
      name: state.name,
      code: state.code,
      no_of_license: state.no_of_license,
      no_of_admin: state.no_of_admin,
      status: state.label.value,
    };
    console.log(newItem);
    addClientItemAction(newItem);
    
    history.push("/app/clients/clients-list");
  
    setState(initialState);
  };
  const { messages } = intl;
  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.clients-add" match={match} />
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
                      onChange={(val) => setState({ ...state, code:  val.target.value })}
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
                      onChange={(val) => setState({ ...state, no_of_license:  val.target.value })}
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
                      onChange={(val) => setState({ ...state, no_of_admin:  val.target.value })}
                      placeholder={messages['forms.client-no_of_admin']}
                     
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.client-status" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={statuses.map((x, i) => {
                        return {
                          label: x.label,
                          value: x.value,
                          key: i,
                        };
                      })}
                      value={state.label || ''}
                      onChange={(val) => setState({ ...state, label:  val })}
                    />
                  </FormGroup> 
                           <Button color="primary" className="mt-4"onClick={() => addNetItem()}>
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
const mapStateToProps = ({ clientListApp }) => {
  const { statuses } = clientListApp;
  return {
    statuses
  };
};
export default injectIntl(connect(mapStateToProps, {
  addClientItemAction: addClientItem,
})(AddNewClientModal));
