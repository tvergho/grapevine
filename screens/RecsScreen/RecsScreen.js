/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import MainHeader from 'components/MainHeader';
import AppButton from 'components/AppButton';
import HeaderSwitch from 'components/HeaderSwitch';
import { Colors } from 'res';
import { getRecs } from 'actions';
import Swiper from 'react-native-swiper';
import NewFeed from './NewFeed';
import AcceptedFeed from './AcceptedFeed';

class RecsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'New',
      search: '',
    };
  }

  componentDidMount() {
    this.props.getRecs();
  }

  onClick = (label) => {
    if (label === 'New') {
      this.setState({ active: 'New' });
      this.swiper.scrollBy(-1, true);
    } else if (label === 'Accepted') {
      this.setState({ active: 'Accepted' });
      this.swiper.scrollBy(1, true);
    }
  }

  onSwipe = (index) => {
    if (index === 0) this.setState({ active: 'New' });
    else if (index === 1) this.setState({ active: 'Accepted' });
  }

  onSearchChange = (text) => {
    this.setState({ search: text });
  }

  createRec = () => {
    this.props.navigation.navigate('CreateRec');
  }

  refresh = () => {
    this.props.getRecs();
  }

  topSection = () => {
    return (
      <MainHeader title="Recs">
        <HeaderSwitch labels={['New', 'Accepted']} start="New" onSwitch={this.onClick} active={this.state.active} />

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
        <Swiper
          showsButtons={false}
          loop={false}
          onIndexChanged={this.onSwipe}
          showsPagination={false}
          ref={(ref) => this.swiper = ref}
        >
          <NewFeed
            display
            recommendations={this.props.rec.recs}
            searchQuery={this.state.search}
            onChange={this.onSearchChange}
            navigation={this.props.navigation}
            loading={this.props.rec.loading}
            refresh={this.refresh}
          />
          <AcceptedFeed
            display
            navigation={this.props.navigation}
          />
        </Swiper>
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

export default connect(mapStateToProps, { getRecs })(RecsScreen);
