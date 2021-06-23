import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Singnin } from "../screens/Signin";

const {Navigator, Screen} = createStackNavigator()
 
export function AuthRoutes(){

  return(
    <Navigator headerMode="none"
     screenOptions={{
       cardStyle:{
        backgroundColor:'transparent'
       }
     }}>
      <Screen name="SignIn" component={Singnin}/>
      <Screen name="Home" component={Home}/>
    </Navigator>
  )
}
