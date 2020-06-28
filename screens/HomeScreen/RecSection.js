import React from 'react';
import { ScrollView } from 'react-native';
import RecCard from 'components/RecCard';
import HomeSection from './HomeSection';

const RecSection = ({ openFeed, navigation, recs }) => {
  return (
    <HomeSection onPress={openFeed} title="Recommended to you">
      <ScrollView
        horizontal
        decelerationRate="fast"
        scrollEventThrottle={200}
      >
        {recs.sort((a, b) => (b.timestamp - a.timestamp)).slice(0, 3).map((rec) => { // Limits to the three most recent recs.
          return (
            <RecCard rec={rec} key={rec.id} navigation={navigation} />
          );
        })}
      </ScrollView>
    </HomeSection>
  );
};

export default RecSection;
