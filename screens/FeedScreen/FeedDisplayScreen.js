import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import FeedItem from './FeedItem';

const FeedDisplayScreen = ({
  display, recommendations, screenName, loading, scroll, refresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  return (
    <View style={{ display: display ? '' : 'none' }}>
      <FlatList
        data={loading ? Array.from(Array(10).keys()) : recommendations?.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item }) => (loading ? <FeedItem loading /> : <FeedItem rec={item} active={screenName} />)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.recommendationID || `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={scroll}
        refreshControl={(
          <RefreshControl refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              if (refresh) refresh();
            }}
          />
        )}
      />
    </View>
  );
};

export default FeedDisplayScreen;
