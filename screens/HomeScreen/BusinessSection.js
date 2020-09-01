import React from 'react';
import {
  FlatList, View, Text, StyleSheet,
} from 'react-native';
import BusinessCard from 'components/BusinessCard';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppButton from 'components/AppButton';
import { Colors } from 'res';
import HomeSection from './HomeSection';

const BusinessSection = ({
  searchResults, navigation, loading, searchError, refresh, location,
}) => {
  let error = '';
  if (searchError.includes('undefined')) error = 'There was an error with the search results.';
  else error = searchError;

  return (
    <HomeSection
      title="Business Discounts"
      onPress={!loading && searchResults.length === 0
        ? () => {}
        : () => {
          navigation.navigate('Detail', {
            title: 'Business Discounts', refresh, placeholder: 'Search for a shop...', location,
          });
        }}
    >
      <FlatList data={loading && searchResults.length === 0 ? Array.from(Array(10).keys()) : searchResults}
        renderItem={({ item, index }) => (<BusinessCard business={item} index={index} navigation={navigation} loading={loading} />)}
        keyExtractor={(biz, index) => biz.businessId || `${index}`}
        scrollEnabled={false}
        style={{ marginBottom: 30 }}
      />

      {!loading && searchResults.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>{error || 'No RecTree locations were found near you.'}</Text>
          <AppButton
            title="Refresh"
            textStyle={styles.refreshText}
            backgroundColor={Colors.PRIMARY}
            width={wp('80%')}
            height={40}
            borderRadius={10}
            style={{ marginTop: 20 }}
            onPress={refresh}
          />
        </View>
      ) : (<></>)}
    </HomeSection>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: hp('50%'),
  },
  loadingTitle: {
    fontFamily: 'Hiragino W5',
    textAlign: 'center',
    fontSize: 14,
  },
  refreshText: {
    fontFamily: 'Hiragino W7',
    color: Colors.WHITE,
    fontSize: 14,
    paddingTop: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    searchError: reduxState.search.error,
  }
);

export default connect(mapStateToProps, null)(BusinessSection);
