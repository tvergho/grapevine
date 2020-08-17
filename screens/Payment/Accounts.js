import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import AccountItem from './AccountItem';

const Accounts = ({
  accounts, refresh, loading, isSandbox,
}) => {
  return (
    <ScrollView
      decelerationRate="fast"
      scrollEventThrottle={200}
      refreshControl={<RefreshControl onRefresh={refresh} refreshing={loading} />}
    >
      {accounts.map((account) => {
        return (
          <AccountItem key={`${account.last4}-${account.bankName}`} account={account} isSandbox={isSandbox} />
        );
      })}
    </ScrollView>
  );
};

export default Accounts;
