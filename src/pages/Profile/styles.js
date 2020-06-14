import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px;
  background-color: #ffff;
`;

export const VIEWNAME = styled.View`
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eeee;
  margin-top: 30px;
  align-items: center;
  width: 100%;
`;
export const VIEWDADOS = styled.View`
  flex-direction: column;
  margin-top: 10px;
  /* margin-left: 10px; */
  align-items: flex-start;
  width: 100%;
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

export const VIEWBUTON = styled.View`
  flex-direction: row;
  margin-top: 25px;
  width: 100%;
  background-color: red;
  height: 40px;
  border-radius: 5;
`;
