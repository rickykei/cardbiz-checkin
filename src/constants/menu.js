import { UserRole,adminRoot } from './defaultValues';

const data = [
 
  {
    id: 'clients',
    icon: 'iconsminds-office',
    label: 'menu.clients',
    to: `${adminRoot}/clients/clients-list`,
     roles: [UserRole.Admin]
  },  
  {
    id: 'users',
    icon: 'iconsminds-administrator',
    label: 'menu.hr.users',
    to: `${adminRoot}/users/users-list`,
     roles: [UserRole.Admin]
  }, 
  {
    id: 'smartcardadmin',
    icon: 'iconsminds-id-card',
    label: 'menu.smartcard.list.admin',
    to: `${adminRoot}/cardsadmin/cards-list`,
     roles: [UserRole.Admin]
  },
  
 
  {
    id: 'admins',
    icon: 'iconsminds-administrator',
    label: 'menu.hr.admin',
    to: `${adminRoot}/admins`,
     roles: [UserRole.Admin, UserRole.Editor] 
  },
  
    {
    id: 'checkin',
    icon: 'simple-icon-wallet',
    label: 'menu.style.checkin',
    to: `${adminRoot}/check/checkin`,
    roles: [UserRole.Admin,UserRole.Editor] 
  },
    {
    id: 'checkout',
    icon: 'simple-icon-wallet',
    label: 'menu.style.checkout',
    to: `${adminRoot}/check/checkout`,
    roles: [UserRole.Admin,UserRole.Editor] 
  },
   {
    id: 'checkrecords',
    icon: 'simple-icon-wallet',
    label: 'menu.style.checkrecords',
    to: `${adminRoot}/check/checkrecords`,
    roles: [UserRole.Admin,UserRole.Editor] 
  },
];
export default data;
