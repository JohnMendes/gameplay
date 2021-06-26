import React from "react";
import {ScrollView} from 'react-native'

import { styles } from "./styles";
import {categories} from '../../utils/categories'
import { Category } from '../Category'

type Props ={
  CategotySelect: string;
  setCategory: (categoryId:string) => void;
  hasCheckBox?: boolean;
}

export function CategotySelect({CategotySelect, setCategory,hasCheckBox = false, ...rest}:Props) {
  return (
  <ScrollView style={styles.container} 
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{paddingRight: 40}}
  >
    {categories.map(category => (
      <Category 
      key={category.id}
      title={category.title}
      icon={category.icon}
      checked={category.id === CategotySelect }
      onPress={()=> setCategory(category.id)}
      hasCheckBox={hasCheckBox}
      />
    ))}
  </ScrollView>
  
  );
}