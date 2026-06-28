/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { CardHeader,NavLink,Nav,NavItem,TabContent,TabPane,Row, Card, CardBody, Badge, CardTitle, CardSubtitle, CardText, Button, } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import StaffDataService from 'services/StaffsService';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useParams, Link } from "react-router-dom";
import SingleLightbox from 'components/pages/SingleLightbox';
import VcfVisitsChartCard from 'containers/dashboards/VcfVisitsChartCard';
import ProfileVisitsChartCard from 'containers/dashboards/ProfileVisitsChartCard';
import { servicePath4, servicePath2 } from 'constants/defaultValues';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ActionLogDataService from 'services/ActionLogDataService';
import * as CryptoJS from 'crypto-js';
import classnames from 'classnames';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function AES_ENCRYPT(text, secretKey) {
  const encrypted = CryptoJS.AES.encrypt(text,'12345678123456781234567812345678' ,{
   mode: CryptoJS.mode.CBC,
   padding: CryptoJS.pad.Pkcs7
 }).toString();
 return encrypted;
} 
const StaffProfileModal = ({ intl, match,currentUser}) => {
  console.log("staffprofile");
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    status: true,
    company_id: [],
    smartcard_uid: [],
    
  };
  const [state, setState] = useState(initialState);
  const { messages } = intl; 
  const { id } = useParams();
  
  const [copyStatus, setCopyStatus] = useState(false); 
  const username = `${state.fname} ${state.lname}`;
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;
  const bannerImgUrl = "/assets/img/social/header.jpg";
  const bannerImgUrl2 = `${servicePath2}/files/${state.company_id.banner}`;
  const staffEditUrl = `../staff-edit/${state.id}`;
  const [adminLogData, setStaffLogData] = useState([]);
  const [activeFirstTab, setActiveFirstTab] = useState('4');
  const [encryptText,setEncryptText] =useState('');
  const moreInfoURL = `${servicePath4}/?key=${encryptText}`;
  const [copyMoreInfoSuccess, setCopyMoreInfoSuccess] = useState('');

  const qrcodeURL = `${servicePath4}/?key=${encryptText}&qrtype=1`;
  const qrcodeURL2 = `${servicePath4}/?key=${encryptText}&qrtype=2`;
  const qrcodeURL3 = `${servicePath4}/?key=${encryptText}&qrtype=3`;
  const qrcodeURL4 = `${servicePath4}/?key=${encryptText}&qrtype=4`;
  const qrcodeURL5 = `${servicePath4}/?key=${encryptText}&qrtype=5`;
  const qrcodeURL6 = `${servicePath4}/?key=${encryptText}&qrtype=6`;
  const qrcodeURL7 = `${servicePath4}/?key=${encryptText}&qrtype=7`;
  const qrcodeURL8 = `${servicePath4}/?key=${encryptText}&qrtype=9`;
 
  const qrcodeURLactual = `${servicePath4}/?key=${encryptText}&qrtype=1`;
  const qrcodeURLactual2 = `${servicePath4}/?key=${encryptText}`;
  const qrcodeURLactual3 = `${servicePath4}/?key=${encryptText}&bo=1`;
  const qrcodeURLactual4 = `${servicePath4}/?key=${encryptText}&bo=0`;
  const qrcodeURLactual5 = `${servicePath4}/?key=${encryptText}&gengw=1`;
  const qrcodeURLactual6 = `${servicePath4}/?key=${encryptText}&genaw=1`;
  const qrcodeURLactual7 = `${servicePath4}/?key=${encryptText}&mobilesite=1`;
  const qrcodeURLactual8 = `${servicePath4}/?key=${encryptText}&geniosaos=1`;
 
  const [copyQrcodeurl1Success, setcopyQrcodeurl1Success] = useState('');
  const [copyQrcodeurl2Success, setcopyQrcodeurl2Success] = useState('');
  const [copyQrcodeurl3Success, setcopyQrcodeurl3Success] = useState('');
  const [copyQrcodeurl4Success, setcopyQrcodeurl4Success] = useState('');
  const [copyQrcodeurl5Success, setcopyQrcodeurl5Success] = useState('');
  const [copyQrcodeurl6Success, setcopyQrcodeurl6Success] = useState('');
  const [copyQrcodeurl7Success, setcopyQrcodeurl7Success] = useState('');
  const [copyQrcodeurl8Success, setcopyQrcodeurl8Success] = useState('');


  const getStaffLog = (aa) => {
    
    ActionLogDataService.getByStaffId(aa)
      .then(response => {
        setStaffLogData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };


  const getStaff = (aa) => {
    StaffDataService.findByUserProfile(aa,currentUser.companyId)
      .then(response => { 
       setState(response.data); 
       console.log("data.id=");
        console.log(response.data.id);
       setEncryptText(encodeURIComponent(AES_ENCRYPT(response.data.id,"12345678123456781234567812345678")));
    console.log("encryptText=");
    console.log(AES_ENCRYPT(response.data.id,"12345678123456781234567812345678"));
      })
      .catch(e => {
        console.log(e);
      });
  
  };

  useEffect(() => {
    console.log("useeffectid=");
    console.log(id); 
    if (id){
      getStaff(id);
      getStaffLog(id);
    }
  }, [id]);

  
 
  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.staffs-profile" match={match} /> <div className="text-zero top-right-button-container">
            <Link to={staffEditUrl}><Button
              color="primary"
              size="lg"
              className="top-right-button"
            >
              <IntlMessages id="profile.button.edit" />
            </Button>
            </Link>
            {'  '}

          </div>
          <Separator className="mb-5" />


        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Row>
                <Colxx xxs="12" className="mb-5">
                  <Card>
                    {state.company_id.banner !== undefined &&
                      <SingleLightbox thumb={bannerImgUrl2} large={bannerImgUrl2} className="social-header card-img" />}

                    {state.company_id.banner === undefined &&
                      <SingleLightbox thumb={bannerImgUrl} large={bannerImgUrl} className="social-header card-img" />}
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="5" xl="4" className="col-left">
                  {state.headshot !== undefined && state.headshot !== "" &&
                    <SingleLightbox
                      thumb={hsImgUrl}
                      large={hsImgUrl}
                      className="img-thumbnail card-img social-profile-img"
                    />}
                  {state.headshot === "" &&
                    <SingleLightbox
                      thumb="/assets/img/profiles/1.jpg"
                      large="/assets/img/profiles/1.jpg"
                      className="img-thumbnail card-img social-profile-img"
                    />}

                  <Card className="mb-4">
                    <CardBody>
                      <div className="text-center pt-4">  
                        <p className="list-item-heading pt-2">{state.fname} {state.lname} {state.mname} {state.pname} {state.oname} {state.pdname} </p>
                      </div>
                      <p className="mb-3">{messages['forms.staff-firstname']}  </p>

                      {state.address ? (
                        <><p className="text-muted text-small mb-2"> <IntlMessages id="pages.address" /> </p>
                          <p className="mb-3">{state.address || 'N/A'} </p></>
                      ) : ''}

                      {state.position ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.position" />
                        </p><p className="mb-3">{state.position} </p></>
                      ) : ''}

                      {state.division ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.division" />
                        </p> <p className="mb-3">{state.division || 'N/A'} </p></>
                      ) : ''}

                      {state.country ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.country" />
                        </p> <p className="mb-3">{state.country} </p></>
                      ) : ''}


                      {state.department ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.department" />
                        </p> <p className="mb-3">{state.department} </p></>
                      ) : ''}

                      {state.work_tel ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.work_tel" />
                        </p> <p className="mb-3">{state.work_tel} </p></>
                      ) : ''}

                      {state.mobile ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.mobile" />
                        </p><p className="mb-3">{state.mobile} </p></>
                      ) : ''}

                      {state.work_email ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.work_email" />
                        </p><p className="mb-3">{state.work_email} </p></>
                      ) : ''}

                      {state.staff_no ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.staff_no" />
                        </p><p className="mb-3">{state.staff_no} </p></>
                      ) : ''}

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.additionalInfo" />
                      </p>
                      <p className="mb-3"><Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      > 
                        <a href={moreInfoURL} target="_blank" rel="noreferrer"  ><IntlMessages id="profile.button.moreInfo" /> </a>
                      </Badge> 
                      <CopyToClipboard text={moreInfoURL} onCopy={() =>setCopyMoreInfoSuccess(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyMoreInfoSuccess ? <span style={{color: 'red'}}>Copied.</span> : null}
                   
                      </p>

                     

                      
                    </CardBody>
                  </Card>

                  <Card className="mb-4">
              <CardHeader>
                <Nav tabs className="card-header-tabs ">
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '1',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('1');
                      }}
                    >
                     <IntlMessages id="cards.tab-admin-qr1" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '2',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('2');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-qr2" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '3',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('3');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-qr3" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '4',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('4');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-qr4" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '5',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('5');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-qr8" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '6',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('6');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-qr7" />
                    </NavLink>
                  </NavItem>
                 
                </Nav>
              </CardHeader>

              <TabContent activeTab={activeFirstTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                     

                      <img alt="qrcode" src={qrcodeURL}  width="250" />
                      <CopyToClipboard text={qrcodeURLactual} onCopy={() =>setcopyQrcodeurl1Success(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyQrcodeurl1Success ? <span style={{color: 'red'}}>Copied.</span> : null}

                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      
                      <img alt="qrcode" src={qrcodeURL2}  width="250" />
                      <CopyToClipboard text={qrcodeURLactual2} onCopy={() =>setcopyQrcodeurl2Success(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyQrcodeurl2Success ? <span style={{color: 'red'}}>Copied.</span> : null}

                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      <img alt="qrcode" src={qrcodeURL3}  width="250" />
                      <CopyToClipboard text={qrcodeURLactual3} onCopy={() =>setcopyQrcodeurl3Success(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyQrcodeurl3Success ? <span style={{color: 'red'}}>Copied.</span> : null}

             
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      <img alt="qrcode" src={qrcodeURL4}  width="250" />
                      <CopyToClipboard text={qrcodeURLactual4} onCopy={() =>setcopyQrcodeurl4Success(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyQrcodeurl4Success ? <span style={{color: 'red'}}>Copied.</span> : null}

             
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>

                <TabPane tabId="5">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      
                      <img alt="qrcode" src={qrcodeURL8}  width="250" />
                      <CopyToClipboard text={qrcodeURLactual8} onCopy={() =>setcopyQrcodeurl8Success(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyQrcodeurl8Success ? <span style={{color: 'red'}}>Copied.</span> : null}

                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
               

                <TabPane tabId="6">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      
                      <img alt="qrcode" src={qrcodeURL7}  width="250" />
                      <CopyToClipboard text={qrcodeURLactual7} onCopy={() =>setcopyQrcodeurl7Success(true)}>
                        <Button> <i className="iconsminds-file-copy" /></Button>
                      </CopyToClipboard>  
                      {copyQrcodeurl7Success ? <span style={{color: 'red'}}>Copied.</span> : null}

                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>

                </Colxx>
                <Colxx xxs="12" lg="7" xl="8" className="col-right">

                  <ProfileVisitsChartCard className="mb-4"/>   

                  <VcfVisitsChartCard className="mb-4"/>
                  

                  <Card className="d-flex flex-row mb-4">

                    <ThumbnailLetters
                      rounded
                      small
                      text={username}
                      className="m-4"
                    />

                    <div className=" d-flex flex-grow-1 min-width-zero">
                      <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                        <div className="min-width-zero">

                          <CardSubtitle className="truncate mb-1">
                            {state.fname} {state.lname}
                          </CardSubtitle>

                          <CardText className="text-muted text-small mb-2">
                            <p> {state.position}</p>
                            {(state.smartcard_uid)  &&
                                 <p> UID_ : {state.smartcard_uid.uid}</p>}
                       </CardText>
                        </div>
                      </CardBody>
                    </div>
                  </Card>

                  <div>
                    <Card>
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="dashboards.logs" />
                        </CardTitle>
                        <div className="dashboard-logs">
                          <PerfectScrollbar
                            options={{ suppressScrollX: true, wheelPropagation: false }}
                          >
                            <table className="table table-sm table-borderless">
                              <tbody>
                                {adminLogData.map((log, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <span
                                          className={`log-indicator align-middle ${log.color}`}
                                        />
                                      </td>
                                      <td>
                                        <span className="font-weight-medium">
                                          {log.label}
                                        </span>
                                      </td>
                                      <td className="text-right">
                                        <span className="text-muted">{log.time}</span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </PerfectScrollbar>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                </Colxx>

              </Row>

 
            </CardBody>
          </Card>
        </Colxx>
      </Row>


    </>
  );
};
const mapStateToProps = ({  authUser }) => {
   
  const { currentUser } = authUser;
  return {
    
    currentUser
  };
};
export default injectIntl(connect(mapStateToProps)(StaffProfileModal));
