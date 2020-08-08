import React from 'react';
import { View, FlatList } from 'react-native';
import FeedItem from './FeedItem';

const FeedDisplayScreen = ({
  display, recommendations, active, loading, scroll,
}) => {
  return (
    <View style={{ display: display ? '' : 'none' }}>
      <FlatList
        data={loading ? Array.from(Array(10).keys()) : recommendations?.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item }) => (loading ? <FeedItem loading /> : <FeedItem rec={item} active={active} />)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.recommendationID || `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={scroll}
      />
    </View>
  );
};

export default FeedDisplayScreen;
