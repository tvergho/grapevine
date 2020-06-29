import React from 'react';
import {
  View, ScrollView,
} from 'react-native';
import RecCard from 'components/RecCard';
import SearchBar from 'components/SearchBar';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FriendsFeed = ({
  display, recommendations, searchQuery, onChange, navigation,
}) => {
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

      <ScrollView
        decelerationRate="fast"
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {recommendations.filter(searchFilter).sort((a, b) => (b.timestamp - a.timestamp)).map((rec) => { // Sorts by timestamp in descending order.
          return (
            <RecCard rec={rec} key={rec.id} feed navigation={navigation} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FriendsFeed;
