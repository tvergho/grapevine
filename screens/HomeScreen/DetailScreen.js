import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import { connect } from 'react-redux';
import BusinessCard from 'components/BusinessCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from 'components/SearchBar';
import { businessNameSearch, businessLocationScroll } from 'actions';
import _ from 'lodash';

const DetailScreen = (props) => {
  const { navigation, route, search } = props;

  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const { loading, businessLoc, businessName } = search;
  const {
    title, refresh, placeholder, location,
  } = route.params;

  useEffect(() => {
    if (!loading) setRefreshing(false);
  });

  const execSearch = (term) => {
    if (term.length > 0) {
      props.businessNameSearch(term, location.latitude, location.longitude);
    }
  };
  const searchDelayed = _.debounce(execSearch, 600);

  const searchChange = (term) => {
    setQuery(term);
    searchDelayed(term);
  };

  const displayedResults = query.length > 0 ? businessName : businessLoc;

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title={title} />
      <SearchBar width={wp('85%')} placeholder={placeholder} onChange={searchChange} value={query} border />

      <FlatList data={loading && displayedResults.searchResults.length === 0 ? Array.from(Array(10).keys()) : displayedResults.searchResults}
        renderItem={({ item, index }) => (<BusinessCard business={item} index={index} navigation={navigation} loading={loading} full />)}
        keyExtractor={(biz) => biz.businessId}
        refreshControl={(
          <RefreshControl refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refresh();
            }}
          />
        )}
        onEndReached={() => {
          if (query.length === 0) {
            props.businessLocationScroll(location.latitude, location.longitude, search.businessLoc.scrollId);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});

const mapStateToProps = (reduxState) => (
  {
    search: reduxState.search,
  }
);

export default connect(mapStateToProps, { businessNameSearch, businessLocationScroll })(DetailScreen);
