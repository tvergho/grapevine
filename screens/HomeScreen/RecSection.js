/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ScrollView } from 'react-native';
import RecCard from 'components/RecCard';
import HomeSection from './HomeSection';

const RecSection = ({
  openFeed, navigation, recs, loading,
}) => {
  if (!loading && (!recs || recs.length === 0)) return null;
  return (
    <HomeSection onPress={openFeed} title="Recommended to you">
      <ScrollView
        horizontal
        decelerationRate="fast"
        scrollEventThrottle={200}
      >
        {loading ? Array.from(Array(3).keys()).map((rec, index) => {
          return (
            <RecCard loading={loading} key={index} />
          );
        }) : <></>}
        {!loading && recs ? recs.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10))).slice(0, 3).map((rec) => { // Limits to the three most recent recs.
          return (
            <RecCard rec={rec} key={rec.recommendationID} navigation={navigation} loading={loading} />
          );
        }) : <></>}
      </ScrollView>
    </HomeSection>
  );
};

export default RecSection;
