import React, { useState, useEffect, useRef } from 'react';
import {
  View, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import { connect } from 'react-redux';
import BusinessCard from 'components/BusinessCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from 'components/SearchBar';
import {
  businessNameSearch, businessLocationScroll, clearNameSearch, setSearchLoad,
} from 'actions';
import _ from 'lodash';
import { withLocation } from 'utils';

const UpdateBusinessCard = React.memo(({
  item, index, navigation, loading,
}) => {
  return (
    <BusinessCard business={item} index={index} navigation={navigation} loading={loading} full backText="Search" />
  );
});

const DetailScreen = (props) => {
  const {
    navigation, route, search, location,
  } = props;

  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const { loading, businessLoc, businessName } = search;
  const {
    title, refresh, placeholder,
  } = route.params;

  useEffect(() => {
    if (!loading) setRefreshing(false);
    if (query.length === 0) {
      props.clearNameSearch();
    }
  }, [query, loading]);

  const execSearch = (term) => {
    if (term.length > 0) {
      props.businessNameSearch(term, location.latitude, location.longitude);
    }
  };

  const searchDelayed = useRef(_.debounce(execSearch, 300)).current;

  const searchChange = (term) => {
    if (term.length > 0) {
      props.setSearchLoad(true);
      searchDelayed(term);
    }
    setQuery(term);
  };

  const displayedResults = query.length > 0 ? businessName : businessLoc;
  const isLoading = (loading && displayedResults.searchResults.length === 0);

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title={title} />
      <SearchBar width={wp('85%')} placeholder={placeholder} onChange={searchChange} value={query} border />

      <FlatList data={isLoading ? Array.from(Array(10).keys()) : displayedResults.searchResults}
        renderItem={({ item, index }) => (<UpdateBusinessCard item={item} index={index} navigation={navigation} loading={loading || refreshing} full />)}
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

export default withLocation(connect(mapStateToProps, {
  businessNameSearch, businessLocationScroll, clearNameSearch, setSearchLoad,
})(DetailScreen));
