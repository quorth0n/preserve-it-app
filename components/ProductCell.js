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

export default class ProductCell extends React.Component {
  onProductPress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
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
  render() {
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
