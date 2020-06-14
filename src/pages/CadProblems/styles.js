import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffff;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 15px;
  color: #ffff;
  margin-top: 10px;
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
  margin-top: 30%;
  width: 90%;
  height: 50%;
  background-color: #ffff;
  border-radius: 5;
  border-style: solid;
  border-color: #f8f9fd;
  border-width: 2px;
  align-items: center;
`;
export const VIEWSTATUS = styled.View`
  flex-direction: column;

  margin-top: 38%;
  width: 90%;
  height: 26%;
  background-color: #ffff;
  border-radius: 5;
  border-style: solid;
  border-color: #f8f9fd;
  border-width: 2px;
`;

export const VIEWBOTTONS = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 90%;
  height: 15%;
  background-color: #f8f9fd;
  border-radius: 5;
  border-style: solid;
  border-color: #f5f6f9;
  border-width: 3px;
`;

export const VIEWBUTON = styled.View`
  flex-direction: column;
  border-color: #f5f6f9;
  width: 33.3%;
  border-width: 3px;
  height: 100%;
`;

export const AvatarFoto = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100;
`;

export const Dado = styled.Text`
  display: flex;
  font-size: 20px;
  color: black;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 5px;
`;

export const Label = styled.Text`
  display: flex;
  font-size: 12px;
  color: gray;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 5px;
`;

export const Logout = styled.Text`
  font-size: 15px;
  color: #eee;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  width: 100%;
`;
