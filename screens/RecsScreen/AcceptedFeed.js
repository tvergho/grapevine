import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import RecCard from 'components/RecCard';
import { getAcceptedRecs } from 'actions';
import { connect } from 'react-redux';

const AcceptedFeed = (props) => {
  const {
    display, loading, recommendations, navigation,
  } = props;

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (display && (!recommendations || recommendations?.length === 0)) {
      props.getAcceptedRecs();
    }
  }, [display]);

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  return (
    <View style={{ display: display ? '' : 'none' }}>
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
