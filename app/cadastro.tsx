import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Cliente } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Cadastro() {
  const [cliente, setCliente] = useState<Cliente>({ nome: "", email: "", endereco: "" });

  async function handleCadastro() {
    if (cliente.nome && cliente.email && cliente.endereco) {
      await AsyncStorage.setItem("cliente", JSON.stringify(cliente));

      Alert.alert("Cadastro", `Cadastro de ${cliente.nome} salvo!`);

      router.replace("/login");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={cliente.nome}
        onChangeText={(nome) => setCliente({ ...cliente, nome })}
        placeholder="Digite seu nome"
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        value={cliente.email}
        onChangeText={(email) => setCliente({ ...cliente, email })}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        value={cliente.endereco}
        onChangeText={(endereco) => setCliente({ ...cliente, endereco })}
        placeholder="Digite seu endereço"
      />

      <Button title="Salvar Cadastro" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5, marginBottom: 10 },
});
