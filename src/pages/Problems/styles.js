import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffff;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #ffff;
  margin-top: 10px;
  margin-left: 15px;
`;

export const Header = styled.View`
  flex-direction: row;
  height: 20%;

  width: 100%;
  background-color: #7d40e7;
`;
export const VIEWDETALHES = styled.View`
  flex-direction: column;
  position: absolute;
  margin-left: 5%;
  margin-top: 25%;
  width: 90%;
  height: 70%;
  /* background-color: #ffff; */
  border-radius: 5;
  border-style: solid;
  /* border-color: #f8f9fd; */
  /* border-width: 2px; */
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
  margin-top: 5px;
  width: 100%;
`;

export const Linha = styled.View`
  background-color: #ffff;

  height: 50px;
  padding-bottom: 8px;
  width: 100%;
  margin-top: 10px;
  border-width: 0.5px;
  /* border-style: solid; */
  border-color: #d3d3d3;
  padding-top: 15px;
  padding-left: 10px;
  flex-direction: row;
  border-radius: 5;
`;
