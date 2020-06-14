import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, TEXT} from './style';

// import { Container } from './styles';

const Header = ({text}) => (
  <Avatar>
    <TEXT>{text}</TEXT>
  </Avatar>
);

Header.PropTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
