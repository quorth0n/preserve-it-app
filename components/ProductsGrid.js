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

export default class ProductsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      products: [
        {
          name: 'Gaspar Brasserie ha',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'
          }
        },
        {
          name: 'Gaspar Brasserie ha',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'
          }
        },
        {
          name: 'Chalk Point Kitchen',
          address: '527 Broome St, New York, NY 10013',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'
          }
        },
        {
          name: 'Kyoto Amber Upper East',
          address: '225 Mulberry St, New York, NY 10012',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'
          }
        },
        {
          name: 'Kyoto Amber Upper East',
          address: '225 Mulberry St, New York, NY 10012',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'
          }
        }
      ]
    };
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow
    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <ImageBackground
            styleName="large"
            source={{ uri: rowData[0].image.url }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{rowData[0].name}</Title>
              <Subtitle styleName="sm-gutter-horizontal">
                {rowData[0].address}
              </Subtitle>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((restaurant, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: restaurant.image.url }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>
                  {restaurant.address}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return <GridRow columns={2}>{cellViews}</GridRow>;
  }

  render() {
    const products = this.state.products;
    // Group the products into rows with 2 columns, except for the
    // first restaurant. The first restaurant is treated as a featured restaurant
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(products, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }
      return 1;
    });

    return <ListView data={groupedData} renderRow={this.renderRow} />;
  }
}
