/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import { connect } from 'react-redux';
import { getMyRecs, deleteRec } from 'actions';
import RecListItem from './RecListItem';

const YourRecsScreen = (props) => {
  const { navigation, rec } = props;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!rec.myRecs || rec.myRecs.length === 0) props.getMyRecs();
  }, []);

  useEffect(() => {
    setRefreshing(false);
  }, [rec.loading]);

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Your Recommendations" />

      <FlatList data={rec.loading ? Array.from(Array(5).keys()) : rec?.myRecs?.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item, index }) => (<RecListItem rec={item} onRemove={props.deleteRec} loading={props.rec.loading || !rec.myRecs} navigation={navigation} />)}
        keyExtractor={(item) => item.recommendationID}
        refreshControl={(
          <RefreshControl refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              props.getMyRecs();
            }}
          />
        )}
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
    rec: reduxState.rec,
  }
);

export default connect(mapStateToProps, { getMyRecs, deleteRec })(YourRecsScreen);
