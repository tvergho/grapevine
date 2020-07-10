/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as Data from 'data';
import MainHeader from 'components/MainHeader';
import AppButton from 'components/AppButton';
import { Colors } from 'res';
import { getRecs } from 'actions';
import FriendsFeed from './FriendsFeed';
import YouFeed from './YouFeed';

class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'Friends',
      search: '',
    };
  }

  componentDidMount() {
    this.props.getRecs();
  }

  onYouClick = () => {
    this.setState({ active: 'You' });
  }

  onFriendsClick = () => {
    this.setState({ active: 'Friends' });
  }

  onSearchChange = (text) => {
    this.setState({ search: text });
  }

  createRec = () => {
    this.props.navigation.navigate('CreateRec');
  }

  topSection = () => {
    return (
      <MainHeader title="Feed">
        <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
          <Button type="clear" titleStyle={this.state.active === 'You' ? styles.activeLink : styles.inactiveLink} title="You" onPress={this.onYouClick} />
          <Button type="clear" titleStyle={this.state.active === 'Friends' ? styles.activeLink : styles.inactiveLink} title="Friends" onPress={this.onFriendsClick} />
        </View>

        <AppButton
          onPress={this.createRec}
          borderRadius={100}
          width={45}
          height={45}
          shadowHeight={2}
          icon={(<FontAwesomeIcon icon={faPencilAlt} size={20} color="rgb(255,255,255)" />)}
          backgroundColor={Colors.PRIMARY}
          style={{ marginBottom: 10, marginLeft: 5, marginRight: 5 }}
        />
      </MainHeader>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        {this.topSection()}
        <FriendsFeed
          display={this.state.active === 'Friends'}
          recommendations={this.props.rec.recs}
          searchQuery={this.state.search}
          onChange={this.onSearchChange}
          navigation={this.props.navigation}
          loading={this.props.rec.loading}
        />
        <YouFeed
          display={this.state.active === 'You'}
          balance={this.props.user.balance}
          transactions={Data.TRANSACTIONS}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
  },
  inactiveLink: {
    fontFamily: 'Hiragino W4',
    color: '#6D7278',
    fontSize: 14,
  },
  activeLink: {
    fontFamily: 'Hiragino W7',
    color: '#FFB7B2',
    fontSize: 14,
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
    rec: reduxState.rec,
  }
);

export default connect(mapStateToProps, { getRecs })(FeedScreen);
