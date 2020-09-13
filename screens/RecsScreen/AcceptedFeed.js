/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import RecCard from 'components/RecCard';
import { getAcceptedRecs } from 'actions';
import { connect } from 'react-redux';
import FillerMessage from 'components/FillerMessage';

const AcceptedFeed = (props) => {
  const {
    display, loading, recommendations, navigation,
  } = props;

  const [refreshing, setRefreshing] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true);

  useEffect(() => {
    if (display && (!recommendations || recommendations?.length === 0 || shouldRefresh)) {
      console.log('load');
      props.getAcceptedRecs();
      setShouldRefresh(false);
    }
  }, [display]);

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  return (
    <View style={{ display: display ? '' : 'none', alignSelf: 'center' }}>
      {
        !loading
        && recommendations?.length === 0
        && <FillerMessage message="You haven't accepted any recommendations yet." refresh={props.getAcceptedRecs} />
      }

      <FlatList
        data={loading ? Array.from(Array(5).keys()) : recommendations?.sort((a, b) => (parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)))}
        renderItem={({ item, index }) => (<RecCard rec={item} feed navigation={navigation} loading={loading || !recommendations} />)}
        keyExtractor={(item, index) => item?.recommendationID || `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              props.getAcceptedRecs();
            }}
          />
        )}
      />
    </View>
  );
};

const mapStateToProps = (reduxState) => (
  {
    loading: reduxState.rec.loading,
    recommendations: reduxState.rec.acceptedRecs,
  }
);

export default connect(mapStateToProps, { getAcceptedRecs })(AcceptedFeed);
