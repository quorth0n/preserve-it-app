import React from 'react';
import { Notifications } from 'expo';
import { NavigationBar, DropDownMenu, Button, Icon, Title } from '@shoutem/ui';

import ProductsGrid from './ProductsGrid';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        { name: 'All', value: 'All Products' },
        { name: 'Fruit', value: 'Fruit' },
        { name: 'Veg', value: 'Veg' },
        { name: 'Dairy', value: 'Dairy' },
        { name: 'Meat', value: 'Meat' }
      ]
    };
  }

  componentDidMount() {
    // this.notif();
  }

  notif = async () => {
    await Notifications.presentLocalNotificationAsync({
      title: 'Milk is expiring in 3 days!',
      body: 'Tap for recipes',
      android: {
        icon:
          'https://cdn.discordapp.com/attachments/575519839783878677/580087540787183625/icon.png'
      }
    });
  };

  render() {
    return (
      <>
        <NavigationBar
          styleName="inline"
          leftComponent={
            <Button>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={
            <Title>
              {this.state.selectedFilter
                ? this.state.selectedFilter.value
                : this.state.filters[0].value}
            </Title>
          }
          rightComponent={
            <DropDownMenu
              options={this.state.filters}
              selectedOption={
                this.state.selectedFilter
                  ? this.state.selectedFilter
                  : this.state.filters[0]
              }
              onOptionSelected={filter =>
                this.setState({ selectedFilter: filter })
              }
              titleProperty="name"
              valueProperty="value"
            />
          }
        />
        <ProductsGrid />
      </>
    );
  }
}
