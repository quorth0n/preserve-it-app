import React from 'react';
import { DatePickerAndroid } from 'react-native';
import {
  TouchableOpacity,
  Subtitle,
  Card,
  Image,
  View,
  Caption
} from '@shoutem/ui';
import fetch from 'isomorphic-fetch';

export default class ProductCell extends React.Component {
  onProductPress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        this.props.product.ref.set(
          {
            exp: selectedDate
          },
          { merge: true }
        );
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  getRecipes = async () => {
    const recipes = await fetch(
      `https://www.food2fork.com/api/search?key=${'3caf5a7186c37080d70611995b477bc5'}&q=${
        this.props.product.name
      }`
    ).json();
    console.log(recipes);
  };

  render() {
    this.getRecipes();
    return (
      <TouchableOpacity styleName="flexible" onPress={this.onProductPress}>
        <Card styleName="flexible">
          <Image
            styleName="medium-wide"
            source={{ uri: this.props.product.imageUri }}
          />
          <View styleName="content">
            <Subtitle numberOfLines={3}>{this.props.product.name}</Subtitle>
            <View styleName="horizontal">
              <Caption
                styleName={
                  (this.props.product.soon ||
                    this.props.product.exp === 'unknown') &&
                  'soon'
                }
                numberOfLines={2}
              >
                {this.props.product.exp === 'unknown'
                  ? 'Tap to add expiration date'
                  : `Expiring on ${this.props.product.exp
                      .toDate()
                      .toDateString()}`}
              </Caption>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
