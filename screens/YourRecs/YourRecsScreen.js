/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import { connect } from 'react-redux';
import { getMyRecs, deleteRec } from 'actions';
import RecListItem from './RecListItem';

const YourRecsScreen = (props) => {
  const { navigation, rec } = props;

  useEffect(() => {
    props.getMyRecs();
  }, []);

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Your Recommendations" />

      <FlatList data={props.rec.loading ? Array.from(Array(5).keys()) : rec?.myRecs?.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item, index }) => (<RecListItem rec={item} onRemove={props.deleteRec} loading={props.rec.loading || !rec.myRecs} navigation={navigation} />)}
        keyExtractor={(item) => item.recommendationID}
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
