/* eslint-disable import/no-extraneous-dependencies */
import React, {useRef, useState , useEffect} from 'react';
import { injectIntl } from 'react-intl';
import { CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle,  } from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import StaffDataService from 'services/StaffsService';
import { connect } from 'react-redux';
import { useParams,useHistory } from "react-router-dom";
import { servicePath2 ,qrcodeSelectData,minisiteSelectData,bizcardOptionSelectData} from 'constants/defaultValues';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import {Html5Qrcode} from 'html5-qrcode';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
  postUrl: 'no-url',
 
};
const dropzoneConfig = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize:10,
  maxFiles: 1,
  acceptedFiles: ".jpeg,.jpg,.png,.gif",
  uploadMultiple: false,
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
            <img id="previewHeadshotImg" data-dz-thumbnail className="img-thumbnail border-0" />
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

const EditClientModal = ({ intl, match, currentUser}) => {
 
  const { id } = useParams();
  const initialState = {
    id: null,
    fname: "",
    lname: "",
    mname: "",
    pname: "",
    oname: "",
    pdname: "",
    staff_no: "",
    company_id: 0,
    company_name_eng: "",
    company_name_chi: "",
    companies: [],
    headshot: "",
    work_email: "",
    work_email2: "",
    work_email3: "",
    home_email: "",
    other_email: "",
    work_email_label: "",
    work_email2_label: "",
    work_email3_label: "",
    home_email_label: "",
    other_email_label: "",
    position: "",
    position_other_lang: "",
    work_tel_label: "",
    work_tel2_label: "",
    work_tel3_label: "",
    work_tel4_label: "",
    work_tel: "",
    work_tel2: "",
    work_tel3: "",
    work_tel4: "",
    mobile: "",
    mobile2: "",
    mobile3: "",
    mobile4: "",
    home_tel: "",
    fax: "",
    mobile_label: "",
    mobile2_label: "",
    mobile3_label: "",
    mobile4_label: "",
    home_tel_label: "",
    fax_label: "",
    web_link: "",
    web_link2: "",
    web_link3: "",
    web_link4: "",
    web_link5: "",
    web_link6: "",
    web_link_label: "",
    web_link_label2: "",
    web_link_label3: "",
    web_link_label4: "",
    web_link_label5: "",
    web_link_label6: "",
    address: "",
    address2: "",
    address3: "",
    address4: "",
    address_label: "",
    address2_label: "",
    address3_label: "",
    address4_label: "",
    division: "",
    department: "",
    country: "",
    bio: "",
         awards: "",
	  qualifications: "",
	  additional_address: "",
	  achievements: "",
    company_website_url: "",
    more_info_tab_url: "",
    facebook_url: "",
    instagram_url: "",
    whatsapp_url: "",
    linkedin_url: "",
    youtube_url: "",
    twitter_url: "",
    wechat_id: "",
    wechat_qr_url:"",
    wechatpage_url: "", 
	  tiktok_url: "", 
	  line_url: "",
	  facebook_messenger_url: "",
	  weibo_url: "",
	  bilibili_url: "",
	  qq_url: "",
	  zhihu_url : "",
	  app_store_url: "",
	  google_play_url: "",
	  googlemap_url: "",
	  snapchat_url: "",
	  telegram_url: "",
	  xiaohongshu_url: "",
	  note: "",
    note_timestamp: false,
    smartcard_uid: "", 
    bizcard_option: 1,
    dig_card_in_vcf:true,
    updatedBy:  currentUser.uid,
    createdBy:  currentUser.uid,
    status: true,
    qrcode_option: 1,
    minisite_option:1,
 
  };
  const apiUrl = `${servicePath2}/companies/codelist`;
  const apiUrlSmartCard = `${servicePath2}/smartcards/findByCompanyIdPullDown?companyId=${currentUser.companyId}&staffId=${id}`;
  const [state, setState] = useState(initialState);

 /* eslint-disable no-unused-vars */

  const [options, setOptions] = useState([]); 
  const history = useHistory();
  const [message, setMessage] = useState("");

  const[file2,setFile]=useState(null);
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;
  const [smartIdSelectData,setSmartIdSelectData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isQRDisabled, setIsQRDisabled] = useState(false);
  const [dText, setDText] = useState('');
  

  const getStaff = (aa) => {
    StaffDataService.findByStaffDocID(aa,currentUser.companyId)
      .then(response => {
        console.log('state value before get staff');
        console.log(state);
        setState(response.data);
        console.log('state value after get staff');
        console.log(response.data);
       
      })
      .catch(e => {
        console.log(e);
      });
  };
  

  const updateStaff = (e) => {
    setIsDisabled(true);  
    e.preventDefault();
    const data = new FormData() 
  
    if(file2 !== null)
    data.append("staff_headshot",file2);
     /* eslint-disable no-restricted-syntax */
     data.append("uid",currentUser.uid);
     console.log('add uid before update staff');
    if (state.qrcode_option===undefined)
    state.qrcode_option=1;

    if (dText!==false && dText!==undefined && dText!=='')
    state.wechat_qr_url=dText;

    for (const [key, val] of Object.entries(state)) {
     
      if (val!==null&& val!==undefined ){
        if (  key !=='company_id' ){
         data.append(key, val);
        
        }else if(typeof(val) === 'string')
         data.append(key, val);
         else
         console.log('companycd');
        
      }else if  (key==='qrcode_option' && val===undefined){
        data.append(key, 1);
      }else if  (key==='qrcode_option' && val===null){
        data.append(key, 1);
      }
      
    }
    StaffDataService.update(state.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The Staff was updated successfully!");
        setIsDisabled(false); // <--- here
        history.push("/app/staffs/staffs-list");
      })
      .catch(r => {
        console.log(r);
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

  async function fetchSmartCardData() {
    axios.get(`${apiUrlSmartCard}`)
      .then(({data}) => {
        const option = data.map((item)=>({
          "value" : item.value,
          "label" : item.label,
      }))
      setSmartIdSelectData(option);
          
      })
      .catch(error => {
        console.error('Smart Card Uid Get error!', error);
      })
  }
  


  const { messages } = intl;
  
  const [headshotImageFile, setHeadshotImageFile] = useState(null);
  const [displayHeadshotCroper, setDisplayHeadshotCroper] = useState(false);
  const openHeadshotCroper = () => {
    setDisplayHeadshotCroper(!displayHeadshotCroper);
  };
  const handleCloseHeadshotCroper = () => {
    setDisplayHeadshotCroper(false);
  };

  const cropperHeadshotRef = useRef(null);

  const onCropHeadshotEnd = () => {
    const imageElement = cropperHeadshotRef?.current;
    const cropper = imageElement?.cropper;
    document.getElementById('previewHeadshotImg').src = cropper.getCroppedCanvas().toDataURL();
    cropper.getCroppedCanvas({width:300,height:300}).toBlob((blob) => {
      const newFile = new File([blob], file2.name, { type: file2.type });
      setFile(newFile);
    },file2.type)
    handleCloseHeadshotCroper();
  };

  const eventHandlers = {
    addedfile: (file) => {
     setFile(file);
    },
    thumbnail: (file) => { 
      openHeadshotCroper();
      setHeadshotImageFile(file.dataURL);
      setFile(file);
    },
    removedfile:() => { handleCloseHeadshotCroper() } 
  }

  const eventHandlersQR = {
      addedfile: (file,val) => {
        const html5QrCode = new Html5Qrcode( "reader"); 
          html5QrCode.scanFile(file, true)
          .then(decodedText => {
            console.log(decodedText);
            setDText(decodedText);
            setIsQRDisabled(true);
          })
          .catch(err => {
            
            console.log(`${err}`)
          });
       
      }
      
    }

  useEffect(() => {
    if (id){
      getStaff(id);
     
    }
  }, [id]);

  useEffect(() => {
    fetchData();
    fetchSmartCardData();
  }, []);

  const initValue = () => {
    setDText(''); 
    state.wechat_qr_url='';
    setIsQRDisabled(false);
  };


  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.staff-edit-title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form>
              
              <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="fname">
                        <IntlMessages id="forms.staff-fname" />
                      </Label>
                      <Input
                        type="text"
                        value={state.fname || ''}
                        onChange={(val) => setState({ ...state, fname: val.target.value })}
                        placeholder={messages['forms.staff-firstname']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-firstname-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="lastname">
                        <IntlMessages id="forms.staff-lastname" />
                      </Label>
                      <Input
                        type="text"
                        value={state.lname || ''}
                        onChange={(val) => setState({ ...state, lname: val.target.value })}
                        placeholder={messages['forms.staff-lastname']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-lastname-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="mname">
                        <IntlMessages id="forms.staff-mname" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mname || ''}
                        onChange={(val) => setState({ ...state, mname: val.target.value })}
                        placeholder={messages['forms.staff-middlename']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-middlename-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="pname">
                        <IntlMessages id="forms.staff-prefixname" />
                      </Label>
                      <Input
                        type="text"
                        value={state.pname || ''}
                        onChange={(val) => setState({ ...state, pname: val.target.value })}
                        placeholder={messages['forms.staff-prefixname']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-prefixname-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="oname">
                        <IntlMessages id="forms.staff-othername" />
                      </Label>
                      <Input
                        type="text"
                        value={state.oname || ''}
                        onChange={(val) => setState({ ...state, oname: val.target.value })}
                        placeholder={messages['forms.staff-othername']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-othername-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="pdname">
                        <IntlMessages id="forms.staff-prodesname" />
                      </Label>
                      <Input
                        type="text"
                        value={state.pdname || ''}
                        onChange={(val) => setState({ ...state, pdname: val.target.value })}
                        placeholder={messages['forms.staff-prodesname']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-prodesname-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="company_name_eng">
                        <IntlMessages id="forms.staff-company_name_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_name_eng || ''}
                        onChange={(val) => setState({ ...state, company_name_eng: val.target.value })}
                        placeholder={messages['forms.staff-company_name_eng']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_name_eng-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="company_name_chi">
                        <IntlMessages id="forms.staff-company_name_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_name_chi || ''}
                        onChange={(val) => setState({ ...state, company_name_chi: val.target.value })}
                        placeholder={messages['forms.staff-company_name_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_name_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="form-staff-headshot" />
                        </CardTitle> 
                        <Row>
                        <Colxx xxs="12" md="2" className="mb-5">
                        <img src={hsImgUrl} alt="headshotImage"  width="150"/>
                        </Colxx> 
                        <Colxx xxs="12" md="10">  <DropzoneComponent
                        config={dropzoneComponentConfig}
                        djsConfig={dropzoneConfig}
                        eventHandlers ={eventHandlers} multiple={false}/> 
                        {displayHeadshotCroper ? (
                          <Cropper
                                src={headshotImageFile}
                                style={{ height: 300, width: "100%" }}
                                initialAspectRatio={1}
                                aspectRatio={1} // if 正方形set 1
                                minCropBoxHeight={300}
                                minCropBoxWidth={300}
                                maxCropBoxHeight={300}
                                maxCropBoxWidth={300}
                                viewMode={1}
                                dragMode='none'  
                                background={0}
                                responsive={0}
                                ref={cropperHeadshotRef}
                              />
                          ) : null}
                          {displayHeadshotCroper ? (
                            <Button color="primary" className="mt-4" onClick={(e) => onCropHeadshotEnd(e)} >
                              <IntlMessages id="forms.crop.ok" />
                            </Button>
                          ) : null}
                          {displayHeadshotCroper ? (
                            <Button color="primary" className="mt-4" onClick={(e) => handleCloseHeadshotCroper(e)} >
                              <IntlMessages id="forms.crop.cancel" />
                            </Button>
                          ) : null}
                        </Colxx>
                        </Row>
                        </CardBody>
                    </Card>
                   
              
                    {(currentUser.companyId === '63142fd5b54bdbb18f556016') &&
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
                      return obj.value === state.company_id.id;
                    })}
                    onChange={(val) => setState({ ...state, company_id: val.value })}
                    
                  />
                </FormGroup>
                }

              <Row>
                <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                      <Label for="work_email">
                        <IntlMessages id="forms.staff-work_email" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_email_label || ''}
                        onChange={(val) => setState({ ...state, work_email_label: val.target.value })}
                        placeholder={messages['forms.staff-work_email_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_email_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_email || ''}
                        onChange={(val) => setState({ ...state, work_email: val.target.value })}
                        placeholder={messages['forms.staff-work_email']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_email-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                   </Colxx>
                   <Colxx xxs="12" md="6">
                   <FormGroup>
                      <Label for="work_email2">
                        <IntlMessages id="forms.staff-work_email2" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_email2_label || ''}
                        onChange={(val) => setState({ ...state, work_email2_label: val.target.value })}
                        placeholder={messages['forms.staff-work_email2_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_email2_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_email2 || ''}
                        onChange={(val) => setState({ ...state, work_email2: val.target.value })}
                        placeholder={messages['forms.staff-work_email2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_email2-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                   </Colxx>
                  </Row>


                  <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="work_email3">
                        <IntlMessages id="forms.staff-work_email3" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_email3_label || ''}
                        onChange={(val) => setState({ ...state, work_email3_label: val.target.value })}
                        placeholder={messages['forms.staff-work_email3_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_email3_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_email3 || ''}
                        onChange={(val) => setState({ ...state, work_email3: val.target.value })}
                        placeholder={messages['forms.staff-work_email3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_email3-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">

                  <FormGroup>
                      <Label for="home_email">
                        <IntlMessages id="forms.staff-home_email" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.home_email_label || ''}
                        onChange={(val) => setState({ ...state, home_email_label: val.target.value })}
                        placeholder={messages['forms.staff-home_email_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-home_email_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.home_email || ''}
                        onChange={(val) => setState({ ...state, home_email: val.target.value })}
                        placeholder={messages['forms.staff-home_email']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-home_email-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                    
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="other_email">
                        <IntlMessages id="forms.staff-other_email" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.other_email_label || ''}
                        onChange={(val) => setState({ ...state, other_email_label: val.target.value })}
                        placeholder={messages['forms.staff-other_email_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-other_email_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.other_email || ''}
                        onChange={(val) => setState({ ...state, other_email: val.target.value })}
                        placeholder={messages['forms.staff-other_email']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-other_email-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="position">
                        <IntlMessages id="forms.staff-position" />
                      </Label>
                      <Row>
                       <Colxx xxs="6" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.position || ''}
                        onChange={(val) => setState({ ...state, position: val.target.value })}
                        placeholder={messages['forms.staff-position']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-position-muted" />
                      </FormText>
                      </Colxx>

                       <Colxx xxs="6" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.position_other_lang || ''}
                        onChange={(val) => setState({ ...state, position_other_lang: val.target.value })}
                        placeholder={messages['forms.staff-position_other_lang']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-position_other_lang-muted" />
                      </FormText>
                      </Colxx>
                      </Row>
                    </FormGroup>
                    
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="work_tel">
                        <IntlMessages id="forms.staff-work_tel" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_tel_label || ''}
                        onChange={(val) => setState({ ...state, work_tel_label: val.target.value })}
                        placeholder={messages['forms.staff-work_tel_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_tel_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_tel || ''}
                        onChange={(val) => setState({ ...state, work_tel: val.target.value })}
                        placeholder={messages['forms.staff-work_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                  <FormGroup>
                      <Label for="work_tel2">
                        <IntlMessages id="forms.staff-work_tel2" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_tel2_label || ''}
                        onChange={(val) => setState({ ...state, work_tel2_label: val.target.value })}
                        placeholder={messages['forms.staff-work_tel2_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_tel2_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_tel2 || ''}
                        onChange={(val) => setState({ ...state, work_tel2: val.target.value })}
                        placeholder={messages['forms.staff-work_tel2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel2-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="work_tel3">
                        <IntlMessages id="forms.staff-work_tel3" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_tel3_label || ''}
                        onChange={(val) => setState({ ...state, work_tel3_label: val.target.value })}
                        placeholder={messages['forms.staff-work_tel3_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_tel3_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_tel3 || ''}
                        onChange={(val) => setState({ ...state, work_tel3: val.target.value })}
                        placeholder={messages['forms.staff-work_tel3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel3-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="work_tel4">
                        <IntlMessages id="forms.staff-work_tel4" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.work_tel4_label || ''}
                        onChange={(val) => setState({ ...state, work_tel4_label: val.target.value })}
                        placeholder={messages['forms.staff-work_tel4_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-work_tel4_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.work_tel4 || ''}
                        onChange={(val) => setState({ ...state, work_tel4: val.target.value })}
                        placeholder={messages['forms.staff-work_tel4']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel4-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                    
                  </Colxx>
                </Row>
              <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="mobile">
                        <IntlMessages id="forms.staff-mobile" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.mobile_label || ''}
                        onChange={(val) => setState({ ...state, mobile_label: val.target.value })}
                        placeholder={messages['forms.staff-mobile_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-mobile_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.mobile || ''}
                        onChange={(val) => setState({ ...state, mobile: val.target.value })}
                        placeholder={messages['forms.staff-mobile']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="mobile2">
                        <IntlMessages id="forms.staff-mobile2" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.mobile2_label || ''}
                        onChange={(val) => setState({ ...state, mobile2_label: val.target.value })}
                        placeholder={messages['forms.staff-mobile2_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-mobile2_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.mobile2 || ''}
                        onChange={(val) => setState({ ...state, mobile2: val.target.value })}
                        placeholder={messages['forms.staff-mobile2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile2-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="mobile3">
                        <IntlMessages id="forms.staff-mobile3" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.mobile3_label || ''}
                        onChange={(val) => setState({ ...state, mobile3_label: val.target.value })}
                        placeholder={messages['forms.staff-mobile3_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-mobile3_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.mobile3 || ''}
                        onChange={(val) => setState({ ...state, mobile3: val.target.value })}
                        placeholder={messages['forms.staff-mobile3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile3-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="mobile4">
                        <IntlMessages id="forms.staff-mobile4" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.mobile4_label || ''}
                        onChange={(val) => setState({ ...state, mobile4_label: val.target.value })}
                        placeholder={messages['forms.staff-mobile4_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-mobile4_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.mobile4 || ''}
                        onChange={(val) => setState({ ...state, mobile4: val.target.value })}
                        placeholder={messages['forms.staff-mobile4']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile4-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label for="home_tel">
                    <IntlMessages id="forms.staff-home_tel" />
                  </Label>
                  <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.home_tel_label || ''}
                        onChange={(val) => setState({ ...state, home_tel_label: val.target.value })}
                        placeholder={messages['forms.staff-home_tel_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-home_tel_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.home_tel || ''}
                        onChange={(val) => setState({ ...state, home_tel: val.target.value })}
                        placeholder={messages['forms.staff-home_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-home_tel-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                  <Label for="fax">
                    <IntlMessages id="forms.staff-fax" />
                  </Label>
                  <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.fax_label || ''}
                        onChange={(val) => setState({ ...state, fax_label: val.target.value })}
                        placeholder={messages['forms.staff-fax_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-fax_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.fax || ''}
                        onChange={(val) => setState({ ...state, fax: val.target.value })}
                        placeholder={messages['forms.staff-fax']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-fax-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="web_link_label">
                        <IntlMessages id="forms.staff-web_link_label" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link_label || ''}
                        onChange={(val) => setState({ ...state, web_link_label: val.target.value })}
                        placeholder={messages['forms.staff-web_link_label']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link_label-muted" />
                      </FormText>
                    </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="web_link">
                        <IntlMessages id="forms.staff-web_link" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link || ''}
                        onChange={(val) => setState({ ...state, web_link: val.target.value })}
                        placeholder={messages['forms.staff-web_link']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link-muted" />
                      </FormText>
                    </FormGroup>
                </Colxx>
                </Row>
               
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="web_link_label2">
                        <IntlMessages id="forms.staff-web_link_label2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link_label2 || ''}
                        onChange={(val) => setState({ ...state, web_link_label2: val.target.value })}
                        placeholder={messages['forms.staff-web_link_label2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link_label2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="web_link2">
                        <IntlMessages id="forms.staff-web_link2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link2 || ''}
                        onChange={(val) => setState({ ...state, web_link2: val.target.value })}
                        placeholder={messages['forms.staff-web_link2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="web_link_label3">
                        <IntlMessages id="forms.staff-web_link_label3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link_label3 || ''}
                        onChange={(val) => setState({ ...state, web_link_label3: val.target.value })}
                        placeholder={messages['forms.staff-web_link_label3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link_label3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="web_link2">
                        <IntlMessages id="forms.staff-web_link3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link3 || ''}
                        onChange={(val) => setState({ ...state, web_link3: val.target.value })}
                        placeholder={messages['forms.staff-web_link3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="web_link_label4">
                        <IntlMessages id="forms.staff-web_link_label4" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link_label4 || ''}
                        onChange={(val) => setState({ ...state, web_link_label4: val.target.value })}
                        placeholder={messages['forms.staff-web_link_label4']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link_label4-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="web_link4">
                        <IntlMessages id="forms.staff-web_link4" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link4 || ''}
                        onChange={(val) => setState({ ...state, web_link4: val.target.value })}
                        placeholder={messages['forms.staff-web_link4']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link4-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="web_link_label5">
                        <IntlMessages id="forms.staff-web_link_label5" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link_label5 || ''}
                        onChange={(val) => setState({ ...state, web_link_label5: val.target.value })}
                        placeholder={messages['forms.staff-web_link_label5']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link_label5-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="web_link5">
                        <IntlMessages id="forms.staff-web_link5" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link5 || ''}
                        onChange={(val) => setState({ ...state, web_link5: val.target.value })}
                        placeholder={messages['forms.staff-web_link5']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link5-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="web_link_label6">
                        <IntlMessages id="forms.staff-web_link_label6" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link_label6 || ''}
                        onChange={(val) => setState({ ...state, web_link_label6: val.target.value })}
                        placeholder={messages['forms.staff-web_link_label6']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link_label6-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="web_link6">
                        <IntlMessages id="forms.staff-web_link6" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link6 || ''}
                        onChange={(val) => setState({ ...state, web_link6: val.target.value })}
                        placeholder={messages['forms.staff-web_link6']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link6-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label for="address">
                    <IntlMessages id="forms.staff-address" />
                  </Label>
                  <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.address_label || ''}
                        onChange={(val) => setState({ ...state, address_label: val.target.value })}
                        placeholder={messages['forms.staff-address_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-address_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.address || ''}
                        onChange={(val) => setState({ ...state, address: val.target.value })}
                        placeholder={messages['forms.staff-address']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                  <Label for="address2">
                    <IntlMessages id="forms.staff-address2" />
                  </Label>
                  <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.address2_label || ''}
                        onChange={(val) => setState({ ...state, address2_label: val.target.value })}
                        placeholder={messages['forms.staff-address2_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-address2_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.address2 || ''}
                        onChange={(val) => setState({ ...state, address2: val.target.value })}
                        placeholder={messages['forms.staff-address2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address2-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                      <Label for="address3">
                        <IntlMessages id="forms.staff-address3" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.address3_label || ''}
                        onChange={(val) => setState({ ...state, address3_label: val.target.value })}
                        placeholder={messages['forms.staff-address3_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-address3_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.address3 || ''}
                        onChange={(val) => setState({ ...state, address3: val.target.value })}
                        placeholder={messages['forms.staff-address3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address3-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="address4">
                        <IntlMessages id="forms.staff-address4" />
                      </Label>
                      <Row >
                      <Colxx xxs="6" md="6" className="mb-5">
                     
                      <Input
                        type="text"
                        value={state.address4_label || ''}
                        onChange={(val) => setState({ ...state, address4_label: val.target.value })}
                        placeholder={messages['forms.staff-address4_label']}

                      />  <FormText color="muted">
                      <IntlMessages id="forms.staff-address4_label-muted" />
                    </FormText>
                      </Colxx>
                      <Colxx xxs="12" md="6" className="mb-5">
                      <Input
                        type="text"
                        value={state.address4 || ''}
                        onChange={(val) => setState({ ...state, address4: val.target.value })}
                        placeholder={messages['forms.staff-address4']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address4-muted" />
                      </FormText>
                      </Colxx> 
                     </Row> 
                    </FormGroup>
                </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label for="division">
                    <IntlMessages id="forms.staff-division" />
                  </Label>
                  <Input
                    type="text"
                    value={state.division || ''}
                    onChange={(val) => setState({ ...state, division: val.target.value })}
                    placeholder={messages['forms.staff-division']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-division-muted" />
                  </FormText>
                </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                  <Label for="department">
                    <IntlMessages id="forms.staff-department" />
                  </Label>
                  <Input
                    type="text"
                    value={state.department || ''}
                    onChange={(val) => setState({ ...state, department: val.target.value })}
                    placeholder={messages['forms.staff-department']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-department-muted" />
                  </FormText>
                </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label for="country">
                    <IntlMessages id="forms.staff-country" />
                  </Label>
                  <Input
                    type="text"
                    value={state.country || ''}
                    onChange={(val) => setState({ ...state, country: val.target.value })}
                    placeholder={messages['forms.staff-country']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-country-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                    <Label for="staff-no">
                      <IntlMessages id="forms.staff-staff_no" />   
                    </Label>

                    <Input
                        type="text"
                        value={state.staff_no || ''}
                        onChange={(val) => setState({ ...state, staff_no: val.target.value })}
                        placeholder={messages['forms.staff-staff_no']}

                      />
                  </FormGroup> 
                </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label for="bio">
                    <IntlMessages id="forms.staff-bio" />
                  </Label>
                  <Input
                    type="text"
                    value={state.bio || ''}
                    onChange={(val) => setState({ ...state, bio: val.target.value })}
                    placeholder={messages['forms.staff-bio']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-bio-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                   
                  <FormGroup>
                  <Label for="company_website_url">
                    <IntlMessages id="forms.staff-company_website_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.company_website_url || ''}
                    onChange={(val) => setState({ ...state, company_website_url: val.target.value })}
                    placeholder={messages['forms.staff-company_website_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-company_website_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                </Row>
           <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="awards">
                        <IntlMessages id="forms.staff-awards" />
                      </Label>
                      <Input
                        type="text"
                        value={state.awards || ''}
                        onChange={(val) => setState({ ...state, awards: val.target.value })}
                        placeholder={messages['forms.staff-awards']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-awards-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="qualifications">
                        <IntlMessages id="forms.staff-qualifications" />
                      </Label>
                      <Input
                        type="text"
                        value={state.qualifications || ''}
                        onChange={(val) => setState({ ...state, qualifications: val.target.value })}
                        placeholder={messages['forms.staff-qualifications']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-qualifications-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
                    <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="additional_address">
                        <IntlMessages id="forms.staff-additional_address" />
                      </Label>
                      <Input
                        type="text"
                        value={state.additional_address || ''}
                        onChange={(val) => setState({ ...state, additional_address: val.target.value })}
                        placeholder={messages['forms.staff-additional_address']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-additional_address-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="achievements">
                        <IntlMessages id="forms.staff-achievements" />
                      </Label>
                      <Input
                        type="text"
                        value={state.achievements || ''}
                        onChange={(val) => setState({ ...state, achievements: val.target.value })}
                        placeholder={messages['forms.staff-achievements']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-achievements-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label for="more_info_tab_url">
                    <IntlMessages id="forms.staff-more_info_tab_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.more_info_tab_url || ''}
                    onChange={(val) => setState({ ...state, more_info_tab_url: val.target.value })}
                    placeholder={messages['forms.staff-more_info_tab_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-more_info_tab_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">

                  <FormGroup>
                  <Label for="facebook_url">
                    <IntlMessages id="forms.staff-facebook_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.facebook_url || ''}
                    onChange={(val) => setState({ ...state, facebook_url: val.target.value })}
                    placeholder={messages['forms.staff-facebook_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-facebook_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label for="instagram_url">
                    <IntlMessages id="forms.staff-instagram_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.instagram_url || ''}
                    onChange={(val) => setState({ ...state, instagram_url: val.target.value })}
                    placeholder={messages['forms.staff-instagram_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-instagram_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                  <Label for="twitter_url">
                    <IntlMessages id="forms.staff-twitter_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.twitter_url || ''}
                    onChange={(val) => setState({ ...state, twitter_url: val.target.value })}
                    placeholder={messages['forms.staff-twitter_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-twitter_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label for="whatsapp_url">
                    <IntlMessages id="forms.staff-whatsapp_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.whatsapp_url || ''}
                    onChange={(val) => setState({ ...state, whatsapp_url: val.target.value })}
                    placeholder={messages['forms.staff-whatsapp_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-whatsapp_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                
                  <FormGroup>
                  <Label for="linkedin_url">
                    <IntlMessages id="forms.staff-linkedin_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.linkedin_url || ''}
                    onChange={(val) => setState({ ...state, linkedin_url: val.target.value })}
                    placeholder={messages['forms.staff-linkedin_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-linkedin_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label for="youtube_url">
                    <IntlMessages id="forms.staff-youtube_url" />
                  </Label>
                  <Input
                    type="text"
                    value={state.youtube_url || ''}
                    onChange={(val) => setState({ ...state, youtube_url: val.target.value })}
                    placeholder={messages['forms.staff-youtube_url']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.staff-youtube_url-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>
                  <Colxx xxs="12" md="6">
                
                  <FormGroup>
                      <Label for="xiaohongshu_url">
                        <IntlMessages id="forms.staff-xiaohongshu_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.xiaohongshu_url || ''}
                        onChange={(val) => setState({ ...state, xiaohongshu_url: val.target.value })}
                        placeholder={messages['forms.staff-wecxiaohongshu_urlhat_id']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-xiaohongshu_url-muted" />
                      </FormText>
                    </FormGroup>
                </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="wechatpage_url">
                        <IntlMessages id="forms.staff-wechatpage_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.wechatpage_url || ''}
                        onChange={(val) => setState({ ...state, wechatpage_url: val.target.value })}
                        placeholder={messages['forms.staff-wechatpage_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-wechatpage_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                   
                  <FormGroup>
                      <Label for="tiktok_url">
                        <IntlMessages id="forms.staff-tiktok_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.tiktok_url || ''}
                        onChange={(val) => setState({ ...state, tiktok_url: val.target.value })}
                        placeholder={messages['forms.staff-tiktok_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-tiktok_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="line_url">
                        <IntlMessages id="forms.staff-line_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.line_url || ''}
                        onChange={(val) => setState({ ...state, line_url: val.target.value })}
                        placeholder={messages['forms.staff-line_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-line_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    
                  <FormGroup>
                      <Label for="facebook_messenger_url">
                        <IntlMessages id="forms.staff-facebook_messenger_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.facebook_messenger_url || ''}
                        onChange={(val) => setState({ ...state, facebook_messenger_url: val.target.value })}
                        placeholder={messages['forms.staff-facebook_messenger_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-facebook_messenger_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
            


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="weibo_url">
                        <IntlMessages id="forms.staff-weibo_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.weibo_url || ''}
                        onChange={(val) => setState({ ...state, weibo_url: val.target.value })}
                        placeholder={messages['forms.staff-weibo_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-weibo_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  
                  <FormGroup>
                      <Label for="bilibili_url">
                        <IntlMessages id="forms.staff-bilibili_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.bilibili_url || ''}
                        onChange={(val) => setState({ ...state, bilibili_url: val.target.value })}
                        placeholder={messages['forms.staff-bilibili_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-bilibili_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>    


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="qq_url">
                        <IntlMessages id="forms.staff-qq_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.qq_url || ''}
                        onChange={(val) => setState({ ...state, qq_url: val.target.value })}
                        placeholder={messages['forms.staff-qq_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-qq_url-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="zhihu_url">
                        <IntlMessages id="forms.staff-zhihu_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.zhihu_url || ''}
                        onChange={(val) => setState({ ...state, zhihu_url: val.target.value })}
                        placeholder={messages['forms.staff-zhihu_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-zhihu_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>    


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="app_store_url">
                        <IntlMessages id="forms.staff-app_store_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.app_store_url || ''}
                        onChange={(val) => setState({ ...state, app_store_url: val.target.value })}
                        placeholder={messages['forms.staff-appsstore_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-app_store_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="google_play_url">
                        <IntlMessages id="forms.staff-google_play_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.google_play_url || ''}
                        onChange={(val) => setState({ ...state, google_play_url: val.target.value })}
                        placeholder={messages['forms.staff-google_play_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-google_play_url-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>    

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="snapchat_url">
                        <IntlMessages id="forms.staff-snapchat_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.snapchat_url || ''}
                        onChange={(val) => setState({ ...state, snapchat_url: val.target.value })}
                        placeholder={messages['forms.staff-snapchat_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-snapchat_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="telegram_url">
                        <IntlMessages id="forms.staff-telegram_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.telegram_url || ''}
                        onChange={(val) => setState({ ...state, telegram_url: val.target.value })}
                        placeholder={messages['forms.staff-telegram_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-telegram_url-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>   

                <Card className="mb-4">
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="form-staff-wechat-qrCode" />
                        </CardTitle> 
                        <Row>
                        <Colxx xxs="12" md="2" className="mb-5">
                          <span id="qr_str"> </span>
                        </Colxx> 
                        <Colxx xxs="12" md="10">  <DropzoneComponent
                         config={dropzoneComponentConfig}
                         djsConfig={dropzoneConfig}
                         eventHandlers={eventHandlersQR}  
                         multiple={false}  
                         />
                         <div id="reader" style={{display : 'none' }}> My reader</div>
                        </Colxx>
                        </Row>
                        </CardBody>
                    </Card>

                    <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="note">
                        <IntlMessages id="forms.staff-wechat_qr_url" />
                      </Label>
                      {isQRDisabled? (
                        <Input
                        type="text"
                        value={dText || state.wechat_qr_url || ''}
                        onChange={(val) => setState({ ...state, wechat_qr_url: val.target.value })}
                        placeholder={messages['forms.staff-wechat_qr_url']}
                        readOnly="readOnly"
                        />
                      ) 
                      : 
                      <Input
                      type="text"
                      value={dText || state.wechat_qr_url || ''}
                      onChange={(val) => setState({ ...state, wechat_qr_url: val.target.value })}
                      placeholder={messages['forms.staff-wechat_qr_url']}
                    />}
                      
                      {isQRDisabled? (
                      <Button color="primary" className="mt-4" onClick={(e) => initValue(e)} >
                        <IntlMessages id="forms.crop.cancel" />
                      </Button>
                      ) : null}
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-wechat_qr_url-muted" />
                      </FormText>
                      
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  
                  <FormGroup>
                      <Label for="wechat_id">
                        <IntlMessages id="forms.staff-wechat_id" />
                      </Label>
                      <Input
                        type="text"
                        value={state.wechat_id || ''}
                        onChange={(val) => setState({ ...state, wechat_id: val.target.value })}
                        placeholder={messages['forms.staff-wechat_id']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-wechat_id-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>   
 
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="note">
                        <IntlMessages id="forms.staff-note" />
                      </Label>
                      <Input
                        type="text"
                        value={state.note || ''}
                        onChange={(val) => setState({ ...state, note: val.target.value })}
                        placeholder={messages['forms.staff-note']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-note-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                   
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-minisite_option" />
                      </Label>

                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-minisite_option"
                        options={minisiteSelectData}
                        value={minisiteSelectData.find(obj => {
                          return obj.value === state.minisite_option;
                        })}
                        onChange={(val) => setState({ ...state, minisite_option: val.value })}

                      />

                    </FormGroup>
                  
                  </Colxx>
                  
                   
                </Row>   

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label for="note">
                        <IntlMessages id="forms.staff-smartcard_uid" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-smartcard_uid" 
                    options={smartIdSelectData}
                     value={smartIdSelectData.find(obj => {
                      return obj.value === state.smartcard_uid;
                    })}
                    onChange={(val) => setState({ ...state, smartcard_uid: val.value })}
                   
                  />
                  
                  </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label>
                    <IntlMessages id="forms.staff-qrcode_option" />
                  </Label>
                   
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-qrcode_option" 
                    options={qrcodeSelectData} 
                    defaultValue={{"label": "Vcard", "value": 1}}
                     value={qrcodeSelectData.find(obj => {
                      return obj.value === state.qrcode_option;
                    })}
                    onChange={(val) => setState({ ...state, qrcode_option: val.value })}
                   
                  />

                </FormGroup>
                  </Colxx>
                </Row>   

              

                <Row>
                 
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label>
                    <IntlMessages id="forms.staff-bizcard_option" />
                  </Label>
                      
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="forms.label.eprofile" 
                    options={bizcardOptionSelectData} 
                    defaultValue={{"label": "VCF", "value": 0}}
                     value={bizcardOptionSelectData.find(obj => {
                      return obj.value === state.bizcard_option;
                    })}
                    onChange={(val) => setState({ ...state, bizcard_option: val.value })}
                   
                  />
                   

                </FormGroup>
                  </Colxx>

                  <Colxx xxs="12" md="6" className="mb-5"> 
                  <FormGroup>
                  <Label>
                    <IntlMessages id="forms.staff-dig_card_in_vcf-option" />
                  </Label>
                  <CustomInput
                    type="radio"
                    id="exCustomRadio3"
                    name="customRadio3"
                    label={messages['forms.label.enable']}
                    checked={state.dig_card_in_vcf === true}
                    onChange={(event) =>
                      setState({
                        ...state,
                        dig_card_in_vcf: event.target.value === 'on',
                      })
                    }
                  />


                  <CustomInput
                    type="radio"
                    id="exCustomRadio4"
                    name="customRadio4"
                    label={messages['forms.label.disable']}
                    checked={state.dig_card_in_vcf === false}
                    onChange={(event) =>
                      setState({
                        ...state,
                        dig_card_in_vcf: event.target.value !== 'on',
                      })
                    }
                  />


                </FormGroup>
                </Colxx>
                </Row>  
                
                <Row>
                 
                  

                 <Colxx xxs="12" md="6" className="mb-5"> 
                 <FormGroup>
                 <Label>
                   <IntlMessages id="forms.staff-status" />
                 </Label>
                 <CustomInput
                   type="radio"
                   id="exCustomRadio5"
                   name="customRadio5"
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
                   id="exCustomRadio6"
                   name="customRadio6"
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
               <Colxx xxs="12" md="6" >
                  <FormGroup>
                      <Label for="note">
                        <IntlMessages id="forms.staff-note-timestamp" />
                      </Label>
                      <CustomInput
                        type="radio"
                        id="noteRadioOn"
                        name="noteRadioOn"
                        label={messages['forms.label.note-timestamp-on']}
                        checked={state.note_timestamp === true}
                        onChange={(event) =>
                          setState({
                            ...state,
                            note_timestamp: event.target.value === 'on',
                          })
                        }
                      />


                      <CustomInput
                        type="radio"
                        id="noteRadioOff"
                        name="noteRadioOff"
                        label={messages['forms.label.note-timestamp-off']}
                        checked={state.note_timestamp === false}
                        onChange={(event) =>
                          setState({
                            ...state,
                            note_timestamp: event.target.value !== 'on',
                          })
                        }
                      />


                    </FormGroup>
                  </Colxx>
               </Row>  
               
                <Button color="primary" className="mt-4" onClick={(e) => updateStaff(e)} disabled={isDisabled}>
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
const mapStateToProps = ({ staffListApp, authUser }) => {
  const { companies } = staffListApp;
  const { currentUser } = authUser;
  return {
    companies,
    currentUser
  };
};
export default injectIntl(connect(mapStateToProps)  (EditClientModal));
