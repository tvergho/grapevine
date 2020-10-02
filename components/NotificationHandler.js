import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { navigate } from 'utils/navigator';
import { connect } from 'react-redux';
import { updateFCMToken, getFriendRequests, getFriends } from 'actions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const NotificationHandler = ({ isAuthenticated, ...props }) => {
  useEffect(() => {
    checkNotificationPermission();

    // Foreground messages.
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      const { notification, data } = remoteMessage;
      const { body, title } = notification;
      PushNotificationIOS.presentLocalNotification({
        alertTitle: title,
        alertBody: body,
        userInfo: data,
      });
    });

    // From background state.
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage?.data?.type && isAuthenticated) nestedNavigate(remoteMessage.data.type);
    });

    // From quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data?.type && isAuthenticated) nestedNavigate(remoteMessage.data.type);
      });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  useEffect(() => {
    updateToken();
  }, [isAuthenticated]);

  const nestedNavigate = (type) => {
    switch (type) {
    case 'Friends':
      navigate('MainApp', { screen: 'Profile' });
      navigate('Profile', { screen: 'Friends' });
      props.getFriendRequests();
      props.getFriends();
      break;
    default:
      break;
    }
  };

  const updateToken = async () => {
    const token = await messaging().getToken();
    updateFCMToken(token);
  };

  const checkNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
    || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      updateToken();
    }
  };

  return null;
};

const mapStateToProps = (reduxState) => (
  {
    isAuthenticated: reduxState.auth.authenticated,
  }
);

export default connect(mapStateToProps, { getFriendRequests, getFriends })(NotificationHandler);
