import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

// import { Container } from './styles';

const Header = ({ title }) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => {}} />
    </View>
  </View>
);

Header.PropTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
