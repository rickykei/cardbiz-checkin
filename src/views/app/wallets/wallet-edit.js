/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useRef,useState, useEffect } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { connect } from 'react-redux';
 
import Breadcrumb from 'containers/navs/Breadcrumb';
import Select from 'react-select';
import { injectIntl } from 'react-intl';
import CustomSelectInput from 'components/common/CustomSelectInput';
import {  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle, CustomInput } from 'reactstrap';
import axios from 'axios';
import { servicePath2 , walletHeadLogoSelectData,walletField1SelectData,walletField1SelectDataWithoutNone,qrcodeSelectData} from 'constants/defaultValues';
import DropzoneComponent from 'react-dropzone-component';
import CompanyDataService from 'services/CompanyService';
import { useParams, useHistory,NavLink } from "react-router-dom";
import 'dropzone/dist/min/dropzone.min.css';
import UserDataService from 'services/UsersService';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = { postUrl: 'no-url', };

 
const dropzoneConfigBanner = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize: 1,
  maxFiles: 1,
  acceptedFiles: ".jpeg,.jpg,.png,.gif",
  uploadMultiple: false,
  resizeWidth: 800,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{' '}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img id="previewWalletImg" data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {' '}
            <span data-dz-name />{' '}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {' '}
        <i className="glyph-icon simple-icon-trash" />{' '}
      </a>
    </div>
  ),
  headers: { 'My-Awesome-Header': 'header value' },
};

 
const WalletPage = ({ intl, match,currentUser }) => {
  const initialState = {
    id: null,
    username: "",
    password: "",
    repassword: "",
    email: "", 
    company_id: 0,
    companies: [],
    status: true,
    wallet_field1_option: Number,   
    wallet_field2_option: Number,   
    wallet_field3_option: Number,
    wallet_logo_option: Number,
    wallet_banner: "",
    wallet_qrcode_option: Number,
    wallet_text_color: String,
    wallet_bg_color: String,
    wallet_status: true,  
  };

  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const [options, setOptions] = useState([]);
  const { id } = useParams();
  const [walletbannerfile, setwalletBannerFile] = useState(null);
 
  const [state, setState] = useState(initialState);
  const [userState, setUserState] = useState();
 
 
  const [message, setMessage] = useState("");
 
  const apiUrl = `${servicePath2}/companies/codelist`;
 
  const CompanyBannerImgUrl = `${servicePath2}/files/${state.wallet_banner}`;
  
  const { messages } = intl;

  const [walletImageFile, setWalletImageFile] = useState(null);
  const [displayWalletCroper, setDisplayWalletCroper] = useState(false);
  const cropperWalletRef = useRef(null);

  const openWalletCroper = () => {
    setDisplayWalletCroper(!displayWalletCroper);
  };
  const handleCloseWalletCroper = () => {
    setDisplayWalletCroper(false);
  };

  const onCropWalletEnd = () => {
    const imageElement = cropperWalletRef?.current;
    const cropper = imageElement?.cropper;
    document.getElementById('previewWalletImg').src = cropper.getCroppedCanvas().toDataURL();
    console.log(walletbannerfile);
    cropper.getCroppedCanvas({width:1032,height:336}).toBlob((blob) => {
      const newFile = new File([blob], walletbannerfile.name, { type: walletbannerfile.type });
      setwalletBannerFile(newFile);
    },walletbannerfile.type);
    handleCloseWalletCroper();
  };

  const eventHandlers = { 
    addedfile: (file) => { setwalletBannerFile(file); },
    thumbnail: (file) => { 
      openWalletCroper();
      setWalletImageFile(file.dataURL);
      setwalletBannerFile(file);
    },
    removedfile:(file) => { handleCloseWalletCroper() } 
  }
 
  const updateCompany = () => {

    console.log(state.company_id);

    if (state.company_id === undefined)
      state.company_id = selectedOptionLO.value;
    console.log(state.company_id);
    const data = new FormData()

    
    /* eslint-disable no-restricted-syntax */


    for (const [key, val] of Object.entries(state)) {
      if (key!=='wallet_banner' )
      data.append(key, val);
    }
    if (walletbannerfile !== null)
      data.append("wallet_banner", walletbannerfile);
     
    CompanyDataService.update(state.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The company was updated successfully!");
       
      })
      .catch(e => {
        console.log(e);
      });
  };
 

  

  const fetchUserRecord = () => {
      
      UserDataService.get(id!==undefined?id:currentUser.uid)
        .then(response => {
          console.log("fetchUserRecord");
          console.log(response.data.email);
          
          setUserState({...userState, two_factor: response.data.two_factor,email: response.data.email});
          
           
        })
        .catch(e => {
          console.log(e);
        });
    };

  const fetchCompanyRecord = () => {
    console.log(currentUser.companyId);
    console.log(id);
    CompanyDataService.get(id!==undefined?id:currentUser.companyId)
      .then(response => {
 
        if (response.data.wallet_field1_option===undefined)
          response.data.wallet_field1_option=5;
        if (response.data.wallet_field2_option===undefined)
          response.data.wallet_field2_option=2;
        if (response.data.wallet_field3_option===undefined)
          response.data.wallet_field3_option=10;
        if (response.data.wallet_logo_option===undefined)
          response.data.wallet_logo_option=1;
        if (response.data.wallet_qrcode_option===undefined)
          response.data.wallet_qrcode_option=4;
        if (response.data.wallet_bg_color===undefined)
          response.data.wallet_bg_color="#000000"; 
        setState(response.data);
         
      })
      .catch(e => {
        console.log(e);
      });
  };

  async function fetchCompanyCode() {
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
    fetchUserRecord();
    fetchCompanyRecord();
    fetchCompanyCode();
  
  }, []);
  
  return (
    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.wallet-edit" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      
     

      
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form>

                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="input-groups.admin-wallet-setting" />
                    </CardTitle>
                  
                   

                    <FormGroup>
                      <CardTitle>
                        <IntlMessages id="form-company-wallet-banner" />
                      </CardTitle>
                      <Row>
                        <Colxx xxs="12" md="2" className="mb-5">
                          <img src={CompanyBannerImgUrl} alt="companyWalletBannerImage" width="150" />
                        </Colxx>
                        <Colxx xxs="12" md="10">  <DropzoneComponent
                          config={dropzoneComponentConfig}
                          djsConfig={dropzoneConfigBanner}
                          eventHandlers={eventHandlers} multiple={false} />
                          {displayWalletCroper ? (
                          <Cropper
                                src={walletImageFile}
                                style={{ height: 300, width: "100%" }}
                                initialAspectRatio={1125/432}
                                aspectRatio={1125/432} // if 正方形set 1
                                minCropBoxHeight={1125}
                                minCropBoxWidth={432}
                                maxCropBoxHeight={1125}
                                maxCropBoxWidth={432}
                                viewMode={1}
                                dragMode='none'  
                                background={0}
                                responsive={0}
                                ref={cropperWalletRef}
                               
                              />
                          ) : null}
                          {displayWalletCroper ? (
                            <Button color="primary" className="mt-4" onClick={(e) => onCropWalletEnd(e)} >
                              <IntlMessages id="forms.crop.ok" />
                            </Button>
                          ) : null}
                          {displayWalletCroper ? (
                            <Button color="primary" className="mt-4" onClick={(e) => handleCloseWalletCroper(e)} >
                              <IntlMessages id="forms.crop.cancel" />
                            </Button>
                          ) : null}
                        </Colxx>
                      </Row>

                    </FormGroup>
 
                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_logo_option" />
                      </Label>

                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-wallet_logo_option"
                        defaultValue={{"label": "None", "value": 3}}
                        options={walletHeadLogoSelectData}
                        value={walletHeadLogoSelectData.find(obj => {
                          return obj.value === state.wallet_logo_option;
                        })}
                        onChange={(val) => setState({ ...state, wallet_logo_option: val.value })}

                      />

                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_field1_option" />
                      </Label>

                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-wallet_field1_option"
                        options={walletField1SelectData}
                        value={walletField1SelectData.find(obj => {
                          return obj.value === state.wallet_field1_option;
                        })}
                        onChange={(val) => setState({ ...state, wallet_field1_option: val.value })}

                      />

                    </FormGroup>

                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_field2_title" />
                      </Label>

                      <Input
                        type="text"
                        value={state.wallet_field2_title || ''}
                        onChange={(val) => setState({ ...state, wallet_field2_title: val.target.value })}
                        placeholder={messages['forms.staff-wallet_field2_title']}

                      />

                    </FormGroup>


                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_field2_option" />
                      </Label>

                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-wallet_field2_option"
                        options={walletField1SelectDataWithoutNone}
                        value={walletField1SelectDataWithoutNone.find(obj => {
                          return obj.value === state.wallet_field2_option;
                        })}
                        onChange={(val) => setState({ ...state, wallet_field2_option: val.value })}

                      />

                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_field3_title" />
                      </Label>

                      <Input
                        type="text"
                        value={state.wallet_field3_title || ''}
                        onChange={(val) => setState({ ...state, wallet_field3_title: val.target.value })}
                        placeholder={messages['forms.staff-wallet_field3_title']}

                      />

                    </FormGroup>

                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_field3_option" />
                      </Label>

                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-wallet_field3_option"
                        options={walletField1SelectDataWithoutNone}
                        value={walletField1SelectDataWithoutNone.find(obj => {
                          return obj.value === state.wallet_field3_option;
                        })}
                        onChange={(val) => setState({ ...state, wallet_field3_option: val.value })}

                      />

                    </FormGroup>

                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-wallet_qrcode_option" />
                      </Label> 
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-wallet_qrcode_option"
                        options={qrcodeSelectData}
                        value={qrcodeSelectData.find(obj => {
                          return obj.value === state.wallet_qrcode_option;
                        })}
                        onChange={(val) => setState({ ...state, wallet_qrcode_option: val.value })} 
                      /> 
                    </FormGroup>

                  
                    <FormGroup>
                      <Label for="mname">
                        <IntlMessages id="forms.staff-wallet_bg_color" />
                      </Label>
                      <Input
                        type="text"
                        value={state.wallet_bg_color || ''}
                        onChange={(val) => setState({ ...state, wallet_bg_color: val.target.value })}
                        placeholder={messages['forms.staff-wallet_bg_color']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-wallet_bg_color-muted" />
                      </FormText>
                    </FormGroup>


                    <Button color="primary" className="mt-4" onClick={() => updateCompany()}>
                      <IntlMessages id="forms.submit" />
                    </Button>
                    <p>{message}</p>
                  </CardBody>
                </Card>

              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </>
  );
};

const mapStateToProps = ({ menu,authUser, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  const { currentUser } = authUser;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    currentUser,
  };
};
export default injectIntl(connect(mapStateToProps)(WalletPage));


