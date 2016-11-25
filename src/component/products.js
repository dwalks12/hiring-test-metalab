import {createElement} from 'react';
import Product from './product';
import * as products from '../data/items';
import Heading from './heading';
import styles from './styles.css';
export default () => (
  <div>
    <Heading>
      <span className={styles.shoppingIcon}>
        &#xE541;
      </span> Products</Heading>
    <Product {...products.cake}/>
    <Product {...products.waffle}/>
    <Product {...products.chocolate}/>
  </div>
);
