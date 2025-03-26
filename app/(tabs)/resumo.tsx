import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { ItemCardapio } from "../../types/types";
import { Asset } from "expo-asset";

const burguerImg = Asset.fromModule(require("../../assets/images/burguer.jpg")).uri;
const pizzaImg = Asset.fromModule(require("../../assets/images/pizza.jpg")).uri;

export default function Resumo() {
  const [carrinho, setCarrinho] = useState<ItemCardapio[]>([
    { id: "1", nome: "Hambúrguer", descricao: "Pão, carne e queijo", preco: 15.99, imagem: burguerImg },
    { id: "2", nome: "Pizza", descricao: "Queijo, tomate e massa", preco: 29.99, imagem: pizzaImg },
  ]);

  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>
      {carrinho.map((item) => (
        <Text key={item.id}>
          - {item.nome}: R$ {item.preco.toFixed(2)}
        </Text>
      ))}
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <Button title="Finalizar Compra" onPress={() => alert("Pedido realizado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  total: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "green" },
});
