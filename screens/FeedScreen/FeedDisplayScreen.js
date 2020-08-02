import React from 'react';
import { View, FlatList } from 'react-native';
import FeedItem from './FeedItem';

const FeedDisplayScreen = ({ display, recommendations, active }) => {
  return (
    <View style={{ display: display ? '' : 'none' }}>
      <FlatList
        data={recommendations?.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item }) => (<FeedItem rec={item} active={active} />)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.recommendationID || `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default FeedDisplayScreen;
