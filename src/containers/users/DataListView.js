import React, { useState } from 'react';

import {
  Card,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);



  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${product.id}`} className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 ">
                  {product.username}
                </p>
              </NavLink>
              <p className="mb-1 text-small w-10 w-sm-100 ">
                {product.company_id.code}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100 ">
                {product.roles.map((r) => 
                 (r.name)
                )
                 }
              </p>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {product.updatedAt}
              </p>
              <p className="w-15 w-sm-100">
                {product.status ? "Active" : "DeActive"}
              </p>
              <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
              >
                <Button outline color="info" href={`user-edit/${product.id}`}>
                  <IntlMessages id="dropdowns.edit" />
                </Button>
                <DropdownToggle caret outline color="info" />
                <DropdownMenu>
                 
            
                  <DropdownItem href={`user-del/${product.id}`}>
                    <IntlMessages id="dropdowns.delete" />
                  </DropdownItem>

                </DropdownMenu>
              </ButtonDropdown>


            </div>

          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
