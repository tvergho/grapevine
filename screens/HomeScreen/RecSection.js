import React from 'react';
import { ScrollView } from 'react-native';
import RecCard from 'components/RecCard';
import HomeSection from './HomeSection';

const RecSection = ({
  openFeed, navigation, recs, loading,
}) => {
  console.log('recs', recs);
  return (
    <HomeSection onPress={openFeed} title="Recommended to you">
      <ScrollView
        horizontal
        decelerationRate="fast"
        scrollEventThrottle={200}
      >
        {loading ? Array.from(Array(10).keys()).map((rec) => {
          return (
            <RecCard loading={loading} />
          );
        }) : <></>}
        {!loading ? recs.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10))).slice(0, 3).map((rec) => { // Limits to the three most recent recs.
          return (
            <RecCard rec={rec} key={rec.id} navigation={navigation} loading={loading} />
          );
        }) : <></>}
      </ScrollView>
    </HomeSection>
  );
};

export default RecSection;
