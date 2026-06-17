import React  from 'react';

import {
  Card,
 
} from 'reactstrap';
 
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
 
const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
 


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
              
                <p className="list-item-heading mb-1 ">
                  {product.uid}
                </p>
              
              <p className="mb-1 text-small w-10 w-sm-100 ">
                { product.company_id.code }
              </p>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {product.updatedAt}
              </p>
              <p className="w-15 w-sm-100">
                {product.status ? "Active" : "DeActive"}
              </p>
             

            </div>

          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
