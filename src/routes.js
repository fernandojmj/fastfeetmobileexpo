import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createBottomTabNavigator } from "react-navigation-tabs";

import Login from "./pages/Login";
import Delivery from "./pages/Delivery";
import Profile from "./pages/Profile";
import DeliveryDetail from "./pages/DeliveryDetail";
import CadProblems from "./pages/CadProblems";
import Problems from "./pages/Problems";
import ConfirmDelivery from "./pages/ConfirmDelivery";
import Map from "./pages/Map";

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          Login,
        }),
        App: createBottomTabNavigator(
          {
            Delivery,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: "#7d40e7",
              inactiveTintColor: "#c7c7c7",
              showIcon: true,

              style: {
                backgroundColor: "#ffff",
              },
            },
          }
        ),
        DeliveryDetail,
        CadProblems,
        Problems,
        ConfirmDelivery,
        Map,
      },
      {
        initialRouteName: userLogged ? "App" : "Sign",
      }
    )
  );

export default Routes;
