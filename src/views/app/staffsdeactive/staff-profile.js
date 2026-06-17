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
 
function AES_ENCRYPT(text, secretKey) {
  const encrypted = CryptoJS.AES.encrypt(text,secretKey ,{
   mode: CryptoJS.mode.CBC,
   padding: CryptoJS.pad.Pkcs7
 }).toString();
 return encrypted;
} 
const StaffProfileModal = ({ intl, match}) => {
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

  const username = `${state.fname} ${state.lname}`;
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;
  const bannerImgUrl = "/assets/img/social/header.jpg";
  const bannerImgUrl2 = `${servicePath2}/files/${state.company_id.banner}`;
  const staffEditUrl = `../staff-edit/${state.id}`;
  const [adminLogData, setStaffLogData] = useState([]);
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [encryptText,setEncryptText] =useState('');
  const moreInfoURL = `${servicePath4}/?key=${encryptText}`;
  const [copyMoreInfoSuccess, setCopyMoreInfoSuccess] = useState('');

  const qrcodeURL = `${servicePath4}/?key=${encryptText}&qrtype=1`;
  const qrcodeURL2 = `${servicePath4}/?key=${encryptText}&qrtype=2`;
  const qrcodeURL3 = `${servicePath4}/?key=${encryptText}&qrtype=3`;
  const qrcodeURL4 = `${servicePath4}/?key=${encryptText}&qrtype=4`;
  const [copyQrcodeurl1Success, setcopyQrcodeurl1Success] = useState('');
  const [copyQrcodeurl2Success, setcopyQrcodeurl2Success] = useState('');
  const [copyQrcodeurl3Success, setcopyQrcodeurl3Success] = useState('');
  const [copyQrcodeurl4Success, setcopyQrcodeurl4Success] = useState('');


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
    StaffDataService.findByUserProfile(aa)
      .then(response => {
    
        setState(response.data); 
    
       setEncryptText(encodeURIComponent(AES_ENCRYPT(response.data.id,"12345678123456781234567812345678")));
    
      })
      .catch(e => {
        console.log(e);
      });
  
  };

  useEffect(() => {
    if (id){
      getStaff(id);
      getStaffLog(id);
    }
  }, [id]);

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
      () => {
     
          if (newClip===moreInfoURL)
          setCopyMoreInfoSuccess("Copied!");
          if (newClip===qrcodeURL)
          setcopyQrcodeurl1Success("Copied!");
          
          if (newClip===qrcodeURL2)
          setcopyQrcodeurl2Success("Copied!");
          
          if (newClip===qrcodeURL3)
          setcopyQrcodeurl3Success("Copied!");
          
          if (newClip===qrcodeURL4)
          setcopyQrcodeurl4Success("Copied!");
      },
      () => {
     
        if (newClip===moreInfoURL)
          setCopyMoreInfoSuccess("Copy failed!");
          if (newClip===qrcodeURL)
          setcopyQrcodeurl1Success("Copy failed!!");
          
          if (newClip===qrcodeURL2)
          setcopyQrcodeurl2Success("Copy failed!!");
          
          if (newClip===qrcodeURL3)
          setcopyQrcodeurl3Success("Copy failed!!");
          
          if (newClip===qrcodeURL4)
          setcopyQrcodeurl4Success("Copy failed!!");
      }
    );
  }
 
  const copyLink3 = () => {

    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(moreInfoURL);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }

  const copyQRLink1 = () => {
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(qrcodeURL);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }

  const copyQRLink2 = () => {
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(qrcodeURL2);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }

  const copyQRLink3 = () => {
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(qrcodeURL3);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }

  const copyQRLink4 = () => {
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(qrcodeURL4);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }
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
                        <p className="list-item-heading pt-2">{state.fname} </p>
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
                        <Button onClick={copyLink3} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyMoreInfoSuccess}</p>

                         
                   
 

                      
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
                </Nav>
              </CardHeader>

              <TabContent activeTab={activeFirstTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                     
                      <img alt="qrcode" src={qrcodeURL}  width="250" />
                      <Button onClick={copyQRLink1} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyQrcodeurl1Success} 

                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      
                      <img alt="qrcode" src={qrcodeURL2}  width="250" />
                      <Button onClick={copyQRLink2} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyQrcodeurl2Success} 

                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      <img alt="qrcode" src={qrcodeURL3}  width="250" />
                      <Button onClick={copyQRLink3} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyQrcodeurl3Success} 
                 
             
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      <img alt="qrcode" src={qrcodeURL4}  width="250" />
                      <Button onClick={copyQRLink4} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyQrcodeurl4Success} 

             
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
