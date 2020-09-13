import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { Button } from 'react-native-elements';
import FillerMessage from 'components/FillerMessage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import BusinessRecCard from './BusinessRecCard';

const RecSection = ({ recommendations, loading, business }) => {
  const navigation = useNavigation();

  const createRec = () => {
    const { id, name } = business;
    navigation.navigate('CreateRec', { businessId: id, name });
  };

  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <Text style={styles.sectionHeader}>Recommendations</Text>

        <Button type="clear"
          title="Recommend"
          titleStyle={styles.recButton}
          containerStyle={{ marginTop: -10 }}
          onPress={createRec}
        />
      </View>

      {!loading ? recommendations?.map((rec) => {
        return (
          <BusinessRecCard name={rec.from_user} color={rec.color} message={rec.message} />
        );
      })
        : Array.from(Array(10).keys()).map((num) => {
          return (
            <BusinessRecCard loading />
          );
        })}

      {!loading && recommendations?.length === 0 && <FillerMessage message="No recommendations yet for this business." top={80} />}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 15,
    flex: -1,
    flexDirection: 'column',
  },
  sectionHeader: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  row: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: wp('100%'),
    marginBottom: 15,
  },
  recButton: {
    color: '#93DAC0',
    fontSize: 12,
    fontFamily: 'Hiragino W5',
    paddingRight: 20,
    marginLeft: 10,
    paddingTop: 4,
  },
});

export default RecSection;
