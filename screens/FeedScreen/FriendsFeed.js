import React from 'react';
import {
  View, StyleSheet, TextInput, ScrollView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import RecCard from 'components/RecCard';
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
      <View style={{ flex: -1, flexDirection: 'row' }}>
        <FontAwesomeIcon icon={faSearch} size={20} color="rgba(0,0,0,0.7)" />
        <TextInput style={styles.searchBar} placeholder="Search businesses..." placeholderTextColor="#D8D8D8" value={searchQuery} onChangeText={onChange} clearButtonMode="always" />
      </View>

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

const styles = StyleSheet.create({
  searchBar: {
    width: wp('85%'),
    height: 40,
    marginBottom: 20,
    marginTop: -10,
    paddingLeft: 10,
  },
});

export default FriendsFeed;
