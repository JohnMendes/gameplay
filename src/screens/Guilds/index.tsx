import React from "react";
import { View, FlatList } from "react-native";
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./styles";

type Props ={
  handleGuildsSelect:(guils:GuildProps) => void;
}

export function Guilds({handleGuildsSelect}:Props) {
  const guilds = [
    {
      id: "1",
      name: "Lendários",
      icon: "image.png",
      owner: true,
    },
    {
      id: "2",
      name: "KillGames",
      icon: "image.png",
      owner: true,
    },
    {
      id: "3",
      name: "KillGames",
      icon: "image.png",
      owner: true,
    },
    {
      id: "4",
      name: "KillGames",
      icon: "image.png",
      owner: true,
    },
    {
      id: "5",
      name: "KillGames",
      icon: "image.png",
      owner: true,
    },
    {
      id: "6",
      name: "KillGames",
      icon: "image.png",
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList data={guilds} keyExtractor={item => item.id}  renderItem={({item})=>(
        <Guild data={item}
        onPress={() => handleGuildsSelect(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={()=> <ListDivider isCentered={true}/>}
        contentContainerStyle={{paddingBottom:68, paddingTop:103}}
        ListHeaderComponent={()=> <ListDivider isCentered={true}/>}
        style={styles.guilds}
      />
    </View>
  );
}
