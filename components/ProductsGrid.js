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
          title: 'Milk',
          expiration: '5/16',
          soon: true,
          image: {
            url:
              'https://www.worldatlas.com/r/w728-h425-c728x425/upload/b1/98/3d/shutterstock-568076731.jpg'
          }
        },
        {
          title: 'Bacon',
          expiration: '8/25',
          image: {
            url: 'https://i.ytimg.com/vi/yjDpBnPuCnM/maxresdefault.jpg'
          }
        },
        {
          title: 'Eggs',
          expiration: '8/25',
          image: {
            url:
              'https://cdn1.medicalnewstoday.com/content/images/articles/323/323001/bowl-full-of-eggs.jpg'
          }
        },
        {
          title: 'Green beans',
          expiration: '8/25',
          image: {
            url:
              'https://www.simplyrecipes.com/wp-content/uploads/2009/11/green-beans-almonds-thyme-1800-2.jpg'
          }
        },
        {
          title: 'Celery',
          expiration: '8/25',
          image: {
            url:
              'https://draxe.com/wp-content/uploads/2015/04/CeleryTF-IDF_Header.jpg'
          }
        },
        {
          title: 'Peaches',
          expiration: '8/25',
          image: {
            url:
              'https://www.utahfarmbureau.org/Article/Live/titleImage?articleid=110340'
          }
        }
      ]
    };
  }

  renderRow(rowData, sectionId, index) {
    const styles = this.props.style;
    const cellViews = rowData.map((product, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: product.image.url }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{product.title}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName={product.soon && 'soon'} numberOfLines={1}>
                  {`Expiring on ${product.expiration}`}
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
    // Group the products into rows with 2 columns
    const groupedData = GridRow.groupByRows(products, 2);

    return <ListView data={groupedData} renderRow={this.renderRow} />;
  }
}
