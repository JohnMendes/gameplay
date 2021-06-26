import React from "react";
import {NavigationContainer} from '@react-navigation/native'

import {AuthRoutes} from './auth.routes'
import { useAuth } from "../hooks/auth";
import { Singnin } from "../screens/Signin";


export function Routes(){
  const {user} = useAuth();
  return(
    <NavigationContainer>
      { user.id ?  <AuthRoutes/> : <Singnin/>}
    </NavigationContainer>
  )
}