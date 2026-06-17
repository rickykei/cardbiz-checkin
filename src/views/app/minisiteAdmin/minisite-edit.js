/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { connect } from 'react-redux';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle } from 'reactstrap';
import { servicePath2,fontfamilySelectData } from 'constants/defaultValues';
import { useParams, useHistory } from "react-router-dom";
import CompanyService from 'services/CompanyService';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { PhotoshopPicker } from 'react-color';


const ReactDOMServer = require('react-dom/server');

const EditMinisteModal = ({ intl, match,currentUser }) => {

  const { id } = useParams();
  const initialState = {
    id: null,
    name: "",
    font_color: "",
    font_size: "",
    title_font_size: "18",
    font_family:"",
    bg_color: "",
    text_color:"",
    title_text_color:"",
    social_icon_bg_color:"",
    button_color:"",
    links_hover_color:"",
    links_not_hover_color:"",
    links_selected_color:"",
    left_nav_bar_color:"",
    bio_wording_color:"#8c8c8c",
    key_wording_color:"",
    site_bg_color:"", 
  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const getCompany= (aa) => {
    CompanyService.get(aa!==undefined?aa:currentUser.companyId)
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
      console.log(id);
      getCompany(id);
  }, [id]);

  const bgImgUrl = `${servicePath2}/files/${state.bg_image}`;

  const updateCompany = () => {
    
    const data = new FormData(); 

    /* eslint-disable no-restricted-syntax */


    for (const [key, val] of Object.entries(state)) {
         if  (key==='title_font_size' && val===''){
          data.append(key, '18');
      }else if (key==='bio_wording_color' && val===''){
          data.append(key,'#8c8c8c');
      }else{
          data.append(key, val);
      }
    }

    console.log(data.get('smartcard_uid'));

    CompanyService.updateMinisite(state.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The minisite was updated successfully!");
      })
      .catch(f => {
        console.log(f);
      });
  };

  const [displayTextColorPicker, setTextColorPicker] = useState(false);
  const [myTextcolor, setColor1] = useState(false);
  const openTextColorBorad = () => {
    setTextColorPicker(!displayTextColorPicker);
    if(state.text_color !== ''){
      setColor1(state.text_color);
    }
  };
  const handleTextColorClose = () => {
    setTextColorPicker(false);
  };
 
  const handleTextColorChange = (color) => {
    setColor1(color.hex);
    state.text_color = color.hex;
  };

  const [displaySocialBgColorPicker, setSocialBgColorPicker] = useState(false);
  const [mySocialBgcolor, setColor2] = useState(false);
  const openSocialBgColorBorad = () => {
    setSocialBgColorPicker(!displaySocialBgColorPicker);
    if(state.social_icon_bg_color !== ''){
      setColor2(state.social_icon_bg_color);
    }
  };
  const handleSocialBgColorClose = () => {
    setSocialBgColorPicker(false);
  };
 
  const handleSocialBgColorChange = (color) => {
    setColor2(color.hex);
    state.social_icon_bg_color = color.hex;
  };

  const [displayButtonColorPicker, setButtonColorPicker] = useState(false);
  const [myButtoncolor, setColor3] = useState(false);
  const openButtonColorBorad = () => {
    setButtonColorPicker(!displayButtonColorPicker);
    if(state.button_color !== ''){
      setColor3(state.button_color);
    }
  };
  const handleButtonColorClose = () => {
    setButtonColorPicker(false);
  };
 
  const handleButtonColorChange = (color) => {
    setColor3(color.hex);
    state.button_color = color.hex;
  };

  const [displayTitleTextColorPicker, setTitleTextColorPicker] = useState(false);
  const [myTitleTextcolor, setColor4] = useState(false);
  const openTitleTextColorBorad = () => {
    setTitleTextColorPicker(!displayTitleTextColorPicker);
    if(state.title_text_color !== ''){
      setColor4(state.title_text_color);
    }
  };
  const handleTitleTextColorClose = () => {
    setTitleTextColorPicker(false);
  };
 
  const handleTitleTextColorChange = (color) => {
    setColor4(color.hex);
    state.title_text_color = color.hex;
  };

  const [displayKeyWordingColorPicker, setKeyWordingColorPicker] = useState(false);
  const [myKeyWordingcolor, setColor5] = useState(false);
  const openKeyWordingColorBorad = () => {
    setKeyWordingColorPicker(!displayKeyWordingColorPicker);
    if(state.key_wording_color !== ''){
      setColor5(state.key_wording_color);
    }
  };
  const handleKeyWordingColorClose = () => {
    setKeyWordingColorPicker(false);
  };
 
  const handleKeyWordingColorChange = (color) => {
    setColor5(color.hex);
    state.key_wording_color = color.hex;
  };

  const [displayLinksHoverColorPicker, setLinksHoverColorPicker] = useState(false);
  const [myLinksHovercolor, setColor6] = useState(false);
  const openLinksHoverColorBorad = () => {
    setLinksHoverColorPicker(!displayLinksHoverColorPicker);
    if(state.links_hover_color !== ''){
      setColor6(state.links_hover_color);
    }
  };
  const handleLinksHoverColorClose = () => {
    setLinksHoverColorPicker(false);
  };
 
  const handleLinksHoverColorChange = (color) => {
    setColor6(color.hex);
    state.links_hover_color = color.hex;
  };

  const [displayLinksNotHoverColorPicker, setLinksNotHoverColorPicker] = useState(false);
  const [myLinksNotHovercolor, setColor7] = useState(false);
  const openLinksNotHoverColorBorad = () => {
    setLinksNotHoverColorPicker(!displayLinksNotHoverColorPicker);
    if(state.links_not_hover_color !== ''){
      setColor7(state.links_not_hover_color);
    }
  };
  const handleLinksNotHoverColorClose = () => {
    setLinksNotHoverColorPicker(false);
  };
 
  const handleLinksNotHoverColorChange = (color) => {
    setColor7(color.hex);
    state.links_not_hover_color = color.hex;
  };

  const [displayLinksSelectedColorPicker, setLinksSelectedColorPicker] = useState(false);
  const [myLinksSelectedcolor, setColor8] = useState(false);
  const openLinksSelectedColorBorad = () => {
    setLinksSelectedColorPicker(!displayLinksSelectedColorPicker);
    if(state.links_selected_color !== ''){
      setColor8(state.links_selected_color);
    }
  };
  const handleLinksSelectedColorClose = () => {
    setLinksSelectedColorPicker(false);
  };
 
  const handleLinksSelectedColorChange = (color) => {
    setColor8(color.hex);
    state.links_selected_color = color.hex;
  };

  const [displayLeftNavBarColorPicker, setLeftNavBarColorPicker] = useState(false);
  const [myLeftNavBarcolor, setColor9] = useState(false);
  const openLeftNavBarColorBorad = () => {
    setLeftNavBarColorPicker(!displayLeftNavBarColorPicker);
    if(state.left_nav_bar_color !== ''){
      setColor9(state.left_nav_bar_color);
    }
  };
  const handleLeftNavBarColorClose = () => {
    setLeftNavBarColorPicker(false);
  };
 
  const handleLeftNavBarColorChange = (color) => {
    setColor9(color.hex);
    state.left_nav_bar_color = color.hex;
  };

  const [displayBgColorPicker, setBgColorPicker] = useState(false);
  const [myBgcolor, setColor10] = useState(false);
  const openBgColorBorad = () => {
    setBgColorPicker(!displayBgColorPicker);
    if(state.bg_color !== ''){
      setColor10(state.bg_color);
    }
  };
  const handleBgColorClose = () => {
    setBgColorPicker(false);
  };
 
  const handleBgColorChange = (color) => {
    setColor10(color.hex);
    state.bg_color = color.hex;
  };

  const [displayBioWordingColorPicker, setBioWordingColorPicker] = useState(false);
  const [myBioWordingcolor, setColor11] = useState(false);
  const openBioWordingColorBorad = () => {
    setBioWordingColorPicker(!displayBioWordingColorPicker);
    if(state.bio_wording_color !== ''){
      setColor11(state.bio_wording_color);
    }
  };
  const handleBioWordingColorClose = () => {
    setBioWordingColorPicker(false);
  };
 
  const handleBioWordingColorChange = (color) => {
    setColor11(color.hex);
    state.bio_wording_color = color.hex;
  };

  const [displaySiteBgColorPicker, setSiteBgColorPicker] = useState(false);
  const [mySiteBgcolor, setColor12] = useState(false);
  const openSiteBgColorBorad = () => {
    setSiteBgColorPicker(!displaySiteBgColorPicker);
    if(state.site_bg_color !== ''){
      setColor12(state.site_bg_color);
    }
  };
  const handleSiteBgColorClose = () => {
    setSiteBgColorPicker(false);
  };
 
  const handleSiteBgColorChange = (color) => {
    setColor12(color.hex);
    state.site_bg_color = color.hex;
  };

  const { messages } = intl;
  return (

    <>

<Row>
  <Colxx xxs="12">
    <Breadcrumb heading="menu.minisite-edit" match={match} />
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
                  <Label for="keywordingcolor">
                    <IntlMessages id="forms.minisite-key-wording-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.key_wording_color || ''}
                    onChange={(val) => setState({ ...state, key_wording_color: val.target.value })}
                    placeholder={messages['forms.minisite-key-wording-color']}
                    onClick={openKeyWordingColorBorad}
                  />
                   {displayKeyWordingColorPicker ? (
                   <PhotoshopPicker  color={myKeyWordingcolor} onAccept={handleKeyWordingColorClose} onCancel={handleKeyWordingColorClose} onChangeComplete={handleKeyWordingColorChange} />
                   ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>

              <Colxx xxs="12" md="6">
                  <FormGroup>
                  <Label for="titleTextColor">
                    <IntlMessages id="forms.minisite-title-text-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.title_text_color || ''}
                    onChange={(val) => setState({ ...state, title_text_color: val.target.value })}
                    placeholder={messages['forms.minisite-title-text-color']}
                    onClick={openTitleTextColorBorad}
                  />
                  {displayTitleTextColorPicker ? (
                    <PhotoshopPicker  color={myTitleTextcolor} onAccept={handleTitleTextColorClose} onCancel={handleTitleTextColorClose} onChangeComplete={handleTitleTextColorChange} />
                    ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
                </Colxx>            
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="fontfamily">
                    <IntlMessages id="forms.minisite-fontfamily" />
                  </Label>
                  <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-minisite-fontfamily"
                        options={fontfamilySelectData}
                        value={fontfamilySelectData.find(obj => {
                          return obj.value === state.font_family;
                        })}
                        onChange={(val) => setState({ ...state, font_family: val.value })}

                      />

                </FormGroup>

              </Colxx>

              <Colxx xxs="12" md="6">
                <FormGroup>
                  <Label for="fontsize">
                    <IntlMessages id="forms.minisite-fontsize" />
                  </Label>
                  <Input
                    type="text"
                    value={state.font_size || ''}
                    onChange={(val) => setState({ ...state, font_size: val.target.value })}
                    placeholder={messages['forms.minisite-fontsize']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontsize-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              
            <Colxx xxs="12" md="6" className="mb-5">
              <FormGroup>
                <Label for="textcolor">
                  <IntlMessages id="forms.minisite-left-nav-bar-color" />
                </Label>
                <Input
                  type="text"
                  value={state.left_nav_bar_color || ''}
                  onChange={(val) => setState({ ...state, left_nav_bar_color: val.target.value })}
                  placeholder={messages['forms.minisite-left-nav-bar-color']}
                  onClick={openLeftNavBarColorBorad}
                />
                {displayLeftNavBarColorPicker ? (
                <PhotoshopPicker  color={myLeftNavBarcolor} onAccept={handleLeftNavBarColorClose} onCancel={handleLeftNavBarColorClose} onChangeComplete={handleLeftNavBarColorChange} />
                ) : null}
                <FormText color="muted">
                  <IntlMessages id="forms.minisite-fontcolor-muted" />
                </FormText>
              </FormGroup>
              </Colxx>

              <Colxx xxs="12" md="6">
                <FormGroup>
                  <Label for="backgroundcolor">
                    <IntlMessages id="forms.minisite-site-bg-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.site_bg_color || ''}
                    onChange={(val) => setState({ ...state, site_bg_color: val.target.value })}
                    placeholder={messages['forms.minisite-site-bg-color']}
                    onClick={openSiteBgColorBorad}
                  />
                  {displaySiteBgColorPicker ? (
                  <PhotoshopPicker  color={mySiteBgcolor} onAccept={handleSiteBgColorClose} onCancel={handleSiteBgColorClose} onChangeComplete={handleSiteBgColorChange} />
                  ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
              <FormGroup>
                <Label for="backgroundcolor">
                  <IntlMessages id="forms.minisite-backgroundcolor" />
                </Label>
                <Input
                  type="text"
                  value={state.bg_color || ''}
                  onChange={(val) => setState({ ...state, bg_color: val.target.value })}
                  placeholder={messages['forms.minisite-backgroundcolor']}
                  onClick={openBgColorBorad}
                />
                {displayBgColorPicker ? (
                <PhotoshopPicker  color={myBgcolor} onAccept={handleBgColorClose} onCancel={handleBgColorClose} onChangeComplete={handleBgColorChange} />
                ) : null}
                <FormText color="muted">
                  <IntlMessages id="forms.minisite-fontcolor-muted" />
                </FormText>
              </FormGroup>
              </Colxx>

              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="selectedcolor">
                    <IntlMessages id="forms.minisite-links-selected-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.links_selected_color || ''}
                    onChange={(val) => setState({ ...state, links_selected_color: val.target.value })}
                    placeholder={messages['forms.minisite-links-selected-color']}
                    onClick={openLinksSelectedColorBorad}
                  />
                  {displayLinksSelectedColorPicker ? (
                   <PhotoshopPicker  color={myLinksSelectedcolor} onAccept={handleLinksSelectedColorClose} onCancel={handleLinksSelectedColorClose} onChangeComplete={handleLinksSelectedColorChange} />
                   ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-links-not-hover-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.links_not_hover_color || ''}
                    onChange={(val) => setState({ ...state, links_not_hover_color: val.target.value })}
                    placeholder={messages['forms.minisite-links-not-hover-color']}
                    onClick={openLinksNotHoverColorBorad}
                  />
                   {displayLinksNotHoverColorPicker ? (
                   <PhotoshopPicker  color={myLinksNotHovercolor} onAccept={handleLinksNotHoverColorClose} onCancel={handleLinksNotHoverColorClose} onChangeComplete={handleLinksNotHoverColorChange} />
                   ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>

              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="titletextcolor">
                    <IntlMessages id="forms.minisite-links-hover-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.links_hover_color || ''}
                    onChange={(val) => setState({ ...state, links_hover_color: val.target.value })}
                    placeholder={messages['forms.minisite-links-hover-color']}
                    onClick={openLinksHoverColorBorad}
                  />
                  {displayLinksHoverColorPicker ? (
                   <PhotoshopPicker  color={myLinksHovercolor} onAccept={handleLinksHoverColorClose} onCancel={handleLinksHoverColorClose} onChangeComplete={handleLinksHoverColorChange} />
                   ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>
              
            </Row>
         
            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
              <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-button-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.button_color || ''}
                    onChange={(val) => setState({ ...state, button_color: val.target.value })}
                    placeholder={messages['forms.minisite-button-color']}
                    onClick={openButtonColorBorad}
                  />
                  {displayButtonColorPicker ? (
                   <PhotoshopPicker  color={myButtoncolor} onAccept={handleButtonColorClose} onCancel={handleButtonColorClose} onChangeComplete={handleButtonColorChange} />
                   ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>

              <Colxx xxs="12" md="6" className="mb-5">
              <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-text-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.text_color || ''}
                    onChange={(val) => setState({ ...state, text_color: val.target.value })}
                    onClick={openTextColorBorad}
                    placeholder={messages['forms.minisite-text-color']}
                  />
                  {displayTextColorPicker ? (
                   <PhotoshopPicker  color={myTextcolor} onAccept={handleTextColorClose} onCancel={handleTextColorClose} onChangeComplete={handleTextColorChange} />
                   ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
             
            </Row>
    
            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
              <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-bio-wording-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.bio_wording_color || ''}
                    onChange={(val) => setState({ ...state, bio_wording_color: val.target.value })}
                    placeholder={messages['forms.minisite-bio-wording-color']}
                    onClick={openBioWordingColorBorad}
                  />
                  {displayBioWordingColorPicker ? (
                  <PhotoshopPicker  color={myBioWordingcolor} onAccept={handleBioWordingColorClose} onCancel={handleBioWordingColorClose} onChangeComplete={handleBioWordingColorChange} />
                  ) : null}
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            <Colxx xxs="12" md="6" className="mb-5">
              <FormGroup>
                  <Label for="title-font-size">
                    <IntlMessages id="forms.title-font-size" />
                  </Label>
                  <Input
                    type="text"
                    value={state.title_font_size || ''}
                    onChange={(val) => setState({ ...state, title_font_size: val.target.value })}
                    placeholder={messages['forms.title-font-size']}
                  /> 
                  <FormText color="muted">
                    <IntlMessages id="forms.title-font-size-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>
               
            <Button color="primary" className="mt-4" onClick={(e) => updateCompany(e)} disabled={isDisabled}>
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
export default injectIntl(connect(mapStateToProps)(EditMinisteModal));

