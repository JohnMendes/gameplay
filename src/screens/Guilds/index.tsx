import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { api } from "../../services/api";
import { styles } from "./styles";

type Props = {
  handleGuildsSelect: (guils: GuildProps) => void;
};

export function Guilds({ handleGuildsSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loadding, setLoadding] = useState(true);

  async function fetchGuilds() {
    const response = await api.get("/users/@me/guilds");
    setGuilds(response.data);
    setLoadding(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loadding ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildsSelect(item)} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered={true} />}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
          ListHeaderComponent={() => <ListDivider isCentered={true} />}
          style={styles.guilds}
        />
      )}
    </View>
  );
}
