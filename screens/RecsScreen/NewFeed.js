import React, { useState, useEffect } from 'react';
import {
  View, FlatList, RefreshControl,
} from 'react-native';
import RecCard from 'components/RecCard';
import SearchBar from 'components/SearchBar';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const NewFeed = ({
  display, recommendations, searchQuery, onChange, navigation, loading, refresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  const searchFilter = (rec) => {
    let search = searchQuery;
    search = search.trim().toLowerCase();
    if (search.length <= 0) return true;

    let isIncluded = false;
    const {
      business, fromUser, message,
    } = rec;
    const bizName = business ? business.name.trim().toLowerCase() : '';
    const userName = fromUser ? fromUser.name.trim().toLowerCase() : '';
    const recMessage = message ? message.trim().toLowerCase() : '';

    if (bizName.includes(search) || userName.includes(search) || recMessage.includes(search)) isIncluded = true;

    return isIncluded;
  };

  return (
    <View style={{ display: display ? '' : 'none' }}>
      <SearchBar placeholder="Search businesses..." value={searchQuery} onChange={onChange} width={wp('85%')} />

      <FlatList
        data={loading ? Array.from(Array(5).keys()) : recommendations?.filter(searchFilter).sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item, index }) => (<RecCard rec={item} feed navigation={navigation} loading={loading || !recommendations} />)}
        keyExtractor={(item, index) => item?.recommendationID || `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refresh();
            }}
          />
        )}
      />
    </View>
  );
};

export default NewFeed;
