export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden" role: UserRole.Editor
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English', direction: 'ltr' },
  { id: 'zh', name: '中文', direction: 'ltr' } 
 ,
];

export const bizcardOptionSelectData = [{"label": "VCF", "value": 0},{"label": "E-profile", "value": 1},{"label": "Website", "value": 2}];  

export const qrcodeSelectData = [{"label": "Vcard", "value": 1},{"label": "Align with Smart Card", "value": 2},{"label": "E-profile", "value": 3},{"label": "Vcf", "value": 4},{"label": "None", "value": 5}];
  
export const fontfamilySelectData = [{"label": "Didot", "value": "Didot"},{"label": "Baskerville", "value": "Baskerville"},{"label": "Garamond", "value": "Garamond"},{"label": "Times New Roman", "value": "Times New Roman"},
  {"label": "New York", "value": "New York"},{"label": "Georgia", "value": "Georgia"},{"label": "Helvetica", "value": "Helvetica"},{"label": "Futura", "value": "Futura"},{"label": "Avenir", "value": "Avenir"},
  {"label": "Montserrat", "value": "Montserrat"},{"label": "Arial", "value": "Arial"},{"label": "Arial Black", "value": "Arial Black"},{"label": "Verdana", "value": "Verdana"},{"label": "Tahoma", "value": "Tahoma"},
  {"label": "Trebuchet MS", "value": "Trebuchet MS"},{"label": "Impact", "value": "Impact"},{"label": "Gill Sans", "value": "Gill Sans"},{"label": "Palatino", "value": "Palatino"},{"label": "Courier", "value": "Courier"},
  {"label": "Monaco", "value": "Monaco"},{"label": "Bradley Hand", "value": "Bradley Hand"},{"label": "Brush Script MT", "value": "Brush Script MT"},{"label": "Luminari", "value": "Luminari"},
  {"label": "Comic Sans MS", "value": "Comic Sans MS"},{"label": "Lato", "value": "Lato"},{"label": "Lora", "value": "Lora"}
];
export const minisiteSelectData = [
    {"label": "Professional", "value": 1},
  {"label": "Minimalist", "value": 2},
  {"label": "Elegant", "value": 3},
  {"label": "Smart", "value": 4},
  {"label": "Sleek", "value": 5}  
];
export const walletHeadLogoSelectData = [{"label": "None", "value": 1},{"label": "HeadShot", "value": 2},{"label": "Company Logo", "value": 3}];
export const walletField1SelectData = [
  {"label": "First Name only", "value": 1},
  {"label": "First Name and Last Name", "value": 2},
  {"label": "First Name, Last Name and Other Name", "value": 3},
  {"label": "Full Name", "value": 4},
  {"label": "Company Name - English", "value": 5},
  {"label": "Company Name - Other Language", "value": 6},
  {"label": "Division", "value": 7},
  {"label": "Department", "value": 8},
  {"label": "Country", "value": 9},
  {"label": "Title - position", "value": 10},
  {"label": "Title - position (Other Lang)", "value": 11},
  {"label": "None", "value": 12},
];
export const walletField1SelectDataWithoutNone = [
  {"label": "First Name only", "value": 1},
  {"label": "First Name and Last Name", "value": 2},
  {"label": "First Name, Last Name and Other Name", "value": 3},
  {"label": "Full Name", "value": 4},
  {"label": "Company Name - English", "value": 5},
  {"label": "Company Name - Other Language", "value": 6},
  {"label": "Division", "value": 7},
  {"label": "Department", "value": 8},
  {"label": "Country", "value": 9},
  {"label": "Title - position", "value": 10},
  {"label": "Title - position (Other Lang)", "value": 11},
  
];
export const walletField1SelectDataLabel = ["Name","Name","Name","Name","Company","Company","Division","Department","Country","Position"," "];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};


export const currentUser = {
  master:766,
  id: 1,
  title: 'Tester',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  
};


export const adminRoot = '/app';
export const buyUrl = ' ';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;

export const servicePath3 = 'https://e-profile.digital';
export const servicePath2 = `${servicePath3}/api`;
export const servicePath4 = 'https://e-profile.digital';

export const servicePath = 'https://api.coloredstrategies.com';
export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
