/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {  Row, Card, CardBody, Badge, CardTitle, CardSubtitle, CardText,} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import StaffDataService from 'services/StaffsService';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useParams } from "react-router-dom";
import SingleLightbox from 'components/pages/SingleLightbox';
import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
import { servicePath3 } from 'constants/defaultValues';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import PerfectScrollbar from 'react-perfect-scrollbar';
 
 
import data from 'data/logs';


const StaffProfileModal = ({ intl, match, }) => {
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    status: true,
  };
  const [state, setState] = useState(initialState);
  const { messages } = intl;

  const { id } = useParams();

  const getStaff = (aa) => {
    StaffDataService.get(aa)
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
      getStaff(id);
  }, [id]);


  const profilePageURL = `${servicePath3}/?sig=${state.smartcard_uid}`;
  const qrcodeURL = `${servicePath3}/Touchless/QR/${state.smartcard_uid}.png`;
  const username = `${state.fname} ${state.lname}`;

  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.staffs-profile" match={match} />
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
                    <SingleLightbox
                      thumb="/assets/img/social/header.jpg"
                      large="/assets/img/social/header.jpg"
                      className="social-header card-img"
                    />
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="5" xl="4" className="col-left">
                  <SingleLightbox
                    thumb="/assets/img/profiles/l-1.jpg"
                    large="/assets/img/profiles/1.jpg"
                    className="img-thumbnail card-img social-profile-img"
                  />

                  <Card className="mb-4">
                    <CardBody>
                      <div className="text-center pt-4">
                        <p className="list-item-heading pt-2">{state.fname} {state.lname}</p>
                      </div>
                      <p className="mb-3">{messages['forms.staff-firstname']}

                        I’m a web developer. I spend my whole day, practically

                      </p>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.address" />
                      </p>
                      <p className="mb-3">{state.address} </p>


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.position" />
                      </p>
                      <p className="mb-3">{state.position} </p>


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.Website" />
                      </p>
                      <p className="mb-3">{state.web_link} </p>


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.work_tel" />
                      </p>
                      <p className="mb-3">{state.work_tel} </p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.mobile" />
                      </p>
                      <p className="mb-3">{state.mobile} </p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.work_email" />
                      </p>
                      <p className="mb-3">{state.work_email} </p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.additionalInfo" />
                      </p>
                      <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        More Information
                      </Badge>
                      <p className="mb-3">23423 </p>



                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.webprofilepage" />
                      </p>
                      <p className="mb-3"><Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      ><a href={profilePageURL} target="_blank" rel="noreferrer">{profilePageURL}</a> </Badge></p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.downloadVCFContent" />
                      </p>
                      <p className="mb-3"> <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        <a href={profilePageURL}> Download VCF</a>
                      </Badge></p>


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.socialMedia" />
                      </p>


                      <div className="social-icons">
                        <ul className="list-unstyled list-inline">

                          {state.facebook_url !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.facebook_url}>
                                <i className="simple-icon-social-facebook" />
                              </a>
                            </li>
                          }

                          {state.instagram_url !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.instagram_url}>
                                <i className="simple-icon-social-instagram" />
                              </a>
                            </li>
                          }

                          {state.twitter_url !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.twitter_url}>
                                <i className="simple-icon-social-twitter" />
                              </a>
                            </li>
                          }

                          {state.linkedin_url !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.linkedin_url}>
                                <i className="simple-icon-social-linkedin" />
                              </a>
                            </li>
                          }


                          {state.youtube_url !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.youtube_url}>
                                <i className="simple-icon-social-youtube" />
                              </a>
                            </li>
                          }
                          {state.whatsapp_url !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.whatsapp_url}>
                                <i className="simple-icon-social-youtube" />
                              </a>
                            </li>
                          }
                          {state.wechat_id !== undefined &&
                            <li className="list-inline-item">
                              <a href={state.wechat_id}>
                                <i className="simple-icon-social-youtube" />
                              </a>
                            </li>
                          }

                        </ul>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="pages.QRcode" />
                      </CardTitle>
                      <img alt="qrcode" src={qrcodeURL} width="200" />
                    </CardBody>
                  </Card>

                </Colxx>
                <Colxx xxs="12" lg="7" xl="8" className="col-right">

                  <p><WebsiteVisitsChartCard />  </p>


                  <p><WebsiteVisitsChartCard />  </p>


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
                            <p> Uid : {state.smartcard_uid}</p>
                            <p> udid : {state.udid}</p>

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
                                {data.map((log, index) => {
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

export default injectIntl((StaffProfileModal));
