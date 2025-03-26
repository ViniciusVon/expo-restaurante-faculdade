import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ItemCardapio } from "../../types/types";
import { Asset } from "expo-asset";
import AsyncStorage from '@react-native-async-storage/async-storage';

const burguerImg = Asset.fromModule(require("../../assets/images/burguer.jpg")).uri;
const pizzaImg = Asset.fromModule(require("../../assets/images/pizza.jpg")).uri;

export default function Resumo() {
  const [carrinho, setCarrinho] = useState<ItemCardapio[]>([]);

  // Carregar o carrinho do AsyncStorage
  useEffect(() => {
    const carregarCarrinho = async () => {
      const carrinhoSalvo = await AsyncStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        setCarrinho(JSON.parse(carrinhoSalvo));
      }
    };
    carregarCarrinho();
  }, []);

  // Função para remover item do carrinho
  const removerItem = async (id: string) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
    await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  // Função para agrupar os itens e contar as quantidades
  const agruparItens = () => {
    const itensAgrupados: { [key: string]: { item: ItemCardapio; quantidade: number } } = {};
    
    carrinho.forEach(item => {
      if (itensAgrupados[item.id]) {
        itensAgrupados[item.id].quantidade += 1;
      } else {
        itensAgrupados[item.id] = { item, quantidade: 1 };
      }
    });
    
    return Object.values(itensAgrupados);
  };

  // Calcular o total
  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>

      {/* Exibir lista de itens no carrinho */}
      <FlatList
        data={agruparItens()}
        keyExtractor={(item) => item.item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.item.imagem }} style={styles.imagem} />
            <View style={styles.itemDetails}>
              <Text style={styles.nome}>{item.item.nome}</Text>
              <Text style={styles.descricao}>{item.item.descricao}</Text>
              <Text style={styles.preco}>R$ {item.item.preco.toFixed(2)}</Text>
              <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
            </View>
            
            {/* Botão de excluir */}
            <TouchableOpacity onPress={() => removerItem(item.item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <Button title="Finalizar Compra" onPress={() => alert("Pedido realizado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    alignItems: "center",
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 15,
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descricao: {
    fontSize: 14,
    color: "#777",
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  quantidade: {
    fontSize: 14,
    color: "#888",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "green",
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "#f44336",
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
