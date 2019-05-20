import React from 'react';
import {
  GridRow,
  NavigationBar,
  ListView,
  TouchableOpacity,
  ImageBackground,
  Title,
  Subtitle,
  Divider,
  Card,
  Image,
  Tile,
  View,
  Caption
} from '@shoutem/ui';

import { withFirebase } from './Firebase';
import ProductCell from './ProductCell';

class ProductsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.state = {
      products: []
    };
    this.getProducts();
  }

  getProducts = () => {
    this.props.firebase
      .products('1fGuev4gsTYeFFrhXoBV')
      .orderBy('exp')
      .get()
      .then(querySnap => {
        const resolvedDocsPromises = querySnap.docs.map(async snap => {
          const data = snap.data();
          const imageUri = await this.props.firebase
            .productImage(data.imagePath)
            .getDownloadURL();
          const ref = snap.ref;
          return { ...data, imageUri, ref };
        });
        Promise.all(resolvedDocsPromises).then(docs =>
          this.setState({
            products: docs
          })
        );
      });
  };

  renderRow(rowData, sectionId, index) {
    const cellViews = rowData.map((product, id) => (
      <ProductCell product={product} key={id} />
    ));

    return <GridRow columns={2}>{cellViews}</GridRow>;
  }

  render() {
    const products = this.state.products;
    // Group the products into rows with 2 columns
    const groupedData = GridRow.groupByRows(products, 2);

    return <ListView data={groupedData} renderRow={this.renderRow} />;
  }
}

export default withFirebase(ProductsGrid);
