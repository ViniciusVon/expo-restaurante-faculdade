export type ItemCardapio = {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: any;
    quantidade?: number;
};

export type Cliente = {
    nome: string;
    endereco: string;
    email: string;
    senha: string;
};
