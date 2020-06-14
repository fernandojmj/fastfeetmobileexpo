import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {bold} from 'ansi-colors';
import {colors, metrics} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secundary,
    padding: metrics.basePadding * 2,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    marginTop:30,
    
    resizeMode: "contain",
  },

  error: {
    textAlign: 'center',
    color: colors.danger,
    marginTop: 10,
    alignItems: 'center',
   
  },

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    color: colors.ligth,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: metrics.baseMargin,
  },

  input: {
    backgroundColor: '#E6E6FA',
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding,
    marginTop:10,
    
  },

  button: {
    backgroundColor: '#82bf18',
    borderRadius: metrics.baseRadius,
    height: 44,
    marginTop: metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export const Avatar = styled.Image`
  width: 80px;
  height: 100px;
  border-radius: 50;
  background: #eee;
`;

export default styles;
