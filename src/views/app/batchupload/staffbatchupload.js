/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row, Card, CardBody, Button, Form, CardTitle, } from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import 'dropzone/dist/min/dropzone.min.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useHistory,Link  } from "react-router-dom";
import BatchUploadService from 'services/BatchUploadService';
import DropzoneComponent from 'react-dropzone-component';
import {  servicePath2 } from 'constants/defaultValues';

const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
  postUrl: 'no-url',

};
const dropzoneConfig = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize: 10,
  maxFiles: 1,
  acceptedFiles: ".xlsx",
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
            <img data-dz-thumbnail className="img-thumbnail border-0" />
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

const StaffBatchUpload = ({
  intl, match, currentUser
}) => {

  const downloadstaffexcel = `${servicePath2}/batch_upload/downloadStaffExcel?company_id=${currentUser.companyId}&uid=${currentUser.uid}`;

  const [file2, setFile] = useState(null);
  const { messages } = intl;
  const history = useHistory();
  const [message, setMessage] = useState("");

  const eventHandlers = {
    addedfile: (file) => {
      setFile(file);
    }
  }

  const addNetItem = () => {

    const data = new FormData()

    if (file2 !== null) {
      data.append("file", file2);
      data.append("company_id", currentUser.companyId);
      data.append("uid",currentUser.uid);
      /* eslint-disable no-restricted-syntax */

      for (const [key, val] of Object.entries(data)) {

        if (key === "company_id") {
          if (val === undefined) {
            data.append(key, currentUser.companyId);
          } else {
            data.append(key, val);
          }
        } else {
          data.append(key, val);
        }
      }
      BatchUploadService.staffbatchupload(data)
        .then(response => {
          setMessage("upload completed");

        })
        .catch(e => {
          console.log(e);
        });

    } else {
      setMessage("Please place excel file above");
    }
  };


  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.batch.staff.upload" match={match} /><div className="text-zero top-right-button-container">
            <a href={downloadstaffexcel}><Button
              color="primary"
              size="lg"
              className="top-right-button"
            >
              <IntlMessages id="batchupload.download.staff.excel" />
            </Button>
            </a>
            {'  '}

          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form>
                <Row className="mb-4">
                  <Colxx xxs="12">
                    <Card>
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="form-staff-excel-upload" />
                        </CardTitle>
                        <DropzoneComponent
                          config={dropzoneComponentConfig}
                          djsConfig={dropzoneConfig}
                          eventHandlers={eventHandlers} multiple={false} />

                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
               
                <p>{message}</p>
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
const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return {
    currentUser
  };
};
export default injectIntl(connect(mapStateToProps)(StaffBatchUpload));
