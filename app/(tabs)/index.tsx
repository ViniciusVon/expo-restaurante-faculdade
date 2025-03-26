import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { ItemCardapio } from "../../types/types";
import { Asset } from "expo-asset";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

async function handleLogout() {
  await AsyncStorage.removeItem('user');
  router.replace('/login'); 
}

const burguerImg = Asset.fromModule(require("../../assets/images/burguer.jpg")).uri;
const pizzaImg = Asset.fromModule(require("../../assets/images/pizza.jpg")).uri;

const cardapio: ItemCardapio[] = [
  { id: "1", nome: "Hambúrguer", descricao: "Pão, carne e queijo", preco: 15.99, imagem: burguerImg },
  { id: "2", nome: "Pizza", descricao: "Queijo, tomate e massa", preco: 29.99, imagem: pizzaImg },
];

export default function Cardapio() {
  const [carrinho, setCarrinho] = useState<ItemCardapio[]>([]);

  useEffect(() => {
    const carregarCarrinho = async () => {
      const carrinhoSalvo = await AsyncStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        setCarrinho(JSON.parse(carrinhoSalvo));
      }
    };
    carregarCarrinho();
  }, []);

  const adicionarAoCarrinho = async (item: ItemCardapio) => {
    const novoCarrinho = [...carrinho, item];
    setCarrinho(novoCarrinho);

    // Salva o carrinho atualizado no AsyncStorage
    await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

    Alert.alert("Item Adicionado", `${item.nome} foi adicionado ao carrinho!`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com o ícone do carrinho e contador */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/resumo')}>
          <Ionicons name="cart" size={30} color="black" />
          {/* Contador de itens no carrinho */}
          <View style={styles.counter}>
            <Text style={styles.counterText}>{carrinho.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cardapio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imagem} style={styles.imagem} />
            <View style={styles.details}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => adicionarAoCarrinho(item)}
            >
              <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3, // Sombra leve
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  details: {
    marginLeft: 15,
    flex: 1,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  descricao: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  counter: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
