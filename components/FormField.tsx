import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {
  title?: string;
  value: string | number;
  placeholder?: string;
  handleChange: (value: string | number) => void;
};

const FormField = ({ title, value, placeholder, handleChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: "#cdcde0",
  },
});
export default FormField;
