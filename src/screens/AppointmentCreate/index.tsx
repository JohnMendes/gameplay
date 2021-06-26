import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { CategotySelect } from "../../components/CategotySelect";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";
import uuid from 'react-native-uuid'

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {COLLECTION_APPONTIMENTS} from '../../configs/dataBase'
import { useNavigation } from "@react-navigation/native";


export function AppointmentCreate() {
  const [category, setCategory] = useState("");
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day,setDay] = useState('');
  const [month,setMonth] = useState('');
  const [hour,setHour] = useState('');
  const [minute,setMinute] = useState('');
  const [description,setDescription] = useState('');

  const navigation = useNavigation();

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleOpenGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave(){
    const newAppontiments = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    };

    console.log(newAppontiments)

    const storage = await AsyncStorage.getItem(COLLECTION_APPONTIMENTS);
    const appointment = storage ? JSON.parse(storage) :[];
    await AsyncStorage.setItem(COLLECTION_APPONTIMENTS,JSON.stringify([...appointment,newAppontiments]));
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategotySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            CategotySelect={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon ?  <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}> {guild.name ? guild.name :'Selecione um servidor'}</Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>
            <View style={styles.field}>
              <View>
                <Text style={[styles.label, {marginBottom:12}]}>Dia do Mês</Text>
                <View style={styles.column}>
                  <SmallInput onChangeText={setDay} maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput onChangeText={setMonth} maxLength={2} />
                </View>
              </View>
              <View>
                <Text style={[styles.label, {marginBottom:12}]}>Hora e Minuto</Text>
                <View style={styles.column}>
                  <SmallInput onChangeText={setHour} maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput onChangeText={setMinute} maxLength={2} />
                </View>
              </View>
            </View>
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}> Descrição</Text>
              <Text style={styles.caracteresLimit}> Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </Background>
      </ScrollView>
      <ModalView closeModal={handleCloseGuilds} visible={openGuildsModal}>
        <Guilds handleGuildsSelect={handleOpenGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
