import React from 'react';
import { View, ScrollView } from 'react-native';
import EarningsItem from 'components/EarningsItem';
import SavingsEarningsBar from './SavingsEarningsBar';

const YouFeed = ({ display, balance, transactions }) => {
  return (
    <View style={{ display: display ? '' : 'none' }}>
      <SavingsEarningsBar balance={balance} />

      <ScrollView
        decelerationRate="fast"
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {transactions.map((transaction) => {
          return (
            <EarningsItem transaction={transaction} key={transaction.id} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default YouFeed;
