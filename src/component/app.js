import {createElement} from 'react';
import '../fonts.css';
import Cart from './cart';
import Products from './products';
import styles from './styles.css';

export default () => (
  <div className={styles.position}>
    <Cart/>
    <Products/>
  </div>
);
