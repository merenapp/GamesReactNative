import GameList from './GameList';
import React, { Component } from 'react';
import {
    FlatList,
    SectionList,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    View,
    TouchableHighlight,
    Text,
  } from 'react-native';
import Realm from 'realm';
// const Realm = require('realm');

const GameSchema = {
    name: 'Game',
    properties: {
      game_id: 'int',
      game_name: 'string',
      game_released: 'string',
      game_image: 'string?',
      game_clip: 'string?',
      game_genres: 'data'
    }
  };

  const realm = new Realm({
    path: 'GameDatabase.realm',
    schema: [GameSchema]
})
export default class FavGameList extends Component
{
    constructor(props)
    {
        super(props);

        this.props.navigation.setOptions({
            title: 'Favorites Games'
        });

        this.state = {
            FlatListItems: [],
          };
         // realm = new Realm({ path: 'GameDatabase.realm' });
        
          var game_details = realm.objects('Game');
          this.state = {
            FlatListItems: game_details,
          };
    }

    render(){
        return (
          <View style={{flex: 1}}>
              <FlatList
              data={this.state.games}    
              renderItem={this.renderGameItem.bind(this)}
              onEndReached = {() =>
              {
                this.loadNextPage();
              }}
                
                />
          </View>
        );
      }

    renderGameItem({item})
  {
    return(
    <TouchableHighlight 
        onPress={this.onGamePressed.bind(this, item.game)}
        underlayColor='lightgray'
    >
      <View style={{flexDirection: 'row', padding: 10}}>
       <Image
       style={{width: 50, height: 75}} 
       source={item.game.background_image!=null?{
         uri: item.game.background_image
        }: null}
       />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{item.game.name}</Text>
          <Text>{item.game.released}</Text>
        </View>
      </View>
    </TouchableHighlight>
      );
  }

    
}