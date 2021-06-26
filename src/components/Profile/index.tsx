import React from "react";
import { View,Text,Alert } from "react-native";
import { styles } from "./styles";
import {Avatar} from '../Avatar'
import { useAuth } from "../../hooks/auth";
import {RectButton} from 'react-native-gesture-handler'

export function Profile(){
const {user, SingOut} = useAuth()

function handleSignOut(){
Alert.alert('Logout', 'Deseja sair do Servidor',
[
  {
    text:'Não',
    style:'cancel'
  },
  {
    text:'Sim',
    onPress:()=> SingOut()
  }
])
}
  return(
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
      <Avatar urlImage={user.avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greenting}>
            Olá,
          </Text>

          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de Vitoria 
        </Text>
      </View>

    </View>
  )
}