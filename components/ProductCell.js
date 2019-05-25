import React from 'react';
import { DatePickerAndroid, Modal } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import {
  TouchableOpacity,
  Title,
  Subtitle,
  Card,
  Image,
  View,
  Caption,
  Text,
  Screen,
  NavigationBar,
  ListView,
  ImageBackground,
  Tile,
  Divider,
  Button,
  Icon
} from '@shoutem/ui';
import axios from 'axios';
import { WebBrowser } from 'expo';
import _ from 'lodash';

export default class ProductCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cntxtOpened: false, recipesOpened: false, recipes: [] };
  }

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
    console.log(
      `https://www.food2fork.com/api/search?key=${process.env.F2F_API_KEY}&q=${
        this.props.product.name
      }`
    );
    const recipes = await axios.get(
      `https://www.food2fork.com/api/search?key=${process.env.F2F_API_KEY}&q=${
        this.props.product.name
      }`
    );
    console.log(recipes);
    return recipes;
  };

  onRecipesPress = async () => {
    console.log('run1');
    const recipesData = await this.getRecipes();
    console.log(recipesData);
    /*const recipes = _(await recipesData.recipes)
      .take(5)
      .value();
    console.log(recipes);
    this.setState({
      recipesOpened: true,
      recipes
    });*/
  };

  onTriggerPress = () => {
    this.setState({ cntxtOpened: true });
  };

  onBackdropPress = () => {
    this.setState({ cntxtOpened: false });
  };

  renderRow(recipe) {
    console.log(recipe);
    return (
      <TouchableOpacity
        onPress={async () =>
          await WebBrowser.openBrowserAsync(recipe.source_url)
        }
      >
        <ImageBackground
          styleName="large-banner"
          source={{ uri: recipe.image_url }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">
              {recipe.title.replace(/&nbsp;/g, ' ')}
            </Title>
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TouchableOpacity
        styleName="flexible"
        onPress={this.onProductPress}
        onLongPress={() => this.onTriggerPress()}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.recipesOpened}
          onRequestClose={() => this.setState({ recipesOpened: false })}
        >
          <Screen>
            <NavigationBar
              leftComponent={
                <Button onPress={() => this.setState({ recipesOpened: false })}>
                  <Icon name="close" />
                </Button>
              }
              title="Recipes"
              styleName="inline"
            />
            <ListView data={this.state.recipes} renderRow={this.renderRow} />
          </Screen>
        </Modal>

        <Menu
          opened={this.state.cntxtOpened}
          onBackdropPress={() => this.onBackdropPress()}
          onSelect={value => this.onOptionSelect(value)}
        >
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text="Rename" />
            <MenuOption onSelect={this.onRecipesPress} text="Recipes" />
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
          <MenuTrigger disabled={true} />
        </Menu>

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
                  this.props.product.exp === 'unknown'
                    ? 'needsExp'
                    : this.props.product.exp.toDate() < new Date()
                    ? 'soon'
                    : ''
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
