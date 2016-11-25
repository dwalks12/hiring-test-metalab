import {createElement} from 'react';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import {connect} from 'react-redux';

import {clear, setQuantity, deleteVal} from '../action/cart';
import * as products from '../data/items';
import Heading from './heading';
import styles from './styles.css';

const Item = connect(
  () => ({}),
  {setQuantity, deleteVal}
)(({id, quantity, setQuantity, deleteVal}) => {
  const {title, price} = products[id];
  const inc = () => setQuantity({id, quantity: quantity + 1});
  const dec = () => setQuantity({id, quantity: quantity - 1});
  const deleteValue = () => deleteVal(id);
  return (
    <tr key={id} className={styles.items}>
      <td key={`${id}-title`}>
        {title}
        <a className={styles.addsubtractButton} onClick={deleteValue}>
          &#xE872;
        </a>
      </td>
      <td key={`${id}-price`}>
        {`$${Number(price).toFixed(2)}`}
      </td>
      <td key={`${id}-quantity`}>
        {quantity}
        <a className={styles.addsubtractButton} onClick={inc}>&#xE145;</a>
        <a className={styles.addsubtractButton} onClick={dec}>&#xE15B;</a>
      </td>
      <td key={`${id}-total`}>
        {`$${Number(price * quantity).toFixed(2)}`}
      </td>
    </tr>
  );
});
const ClearButton = connect(
  () => ({}),
  {clear}
)(({clear}) => {
  const clearthis = () => clear();
  return (
    <a
      onClick={clearthis}
      className={styles.clearbutton}
    >
      Clear all items
    </a>
  );
});

const Cart = ({total, items}) => {
  return (
      <div>
      <Heading>
        <span className={styles.shoppingIcon}>&#xE8CC;</span> Cart
      </Heading>
      {items.length > 0 ? <ClearButton /> : ''}
      {
        items.length < 1 ?
        <h1 className={styles.emptycart}>Your Cart is Empty</h1> :
        <table className={styles.producttable }>
          <thead>
            <tr className={styles.rowAttributes}>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {map((item) => <Item key={`${item.id}`} {...item}/>, items)}
            <tr className={styles.total}>
              <td colSpan={3}/>
              <td>{`$${Number(total).toFixed(2)}`}</td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  );
};

export default connect((state) => {
  return {
    items: state.cart.items,
    total: reduce(
      (sum, {id, quantity}) => sum + products[id].price * quantity,
      0,
      state.cart.items
    ),
  };
})(Cart);
