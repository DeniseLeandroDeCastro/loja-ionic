import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url: string;
  quantidade: number;
  promocao: boolean;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  data: Produto[] = [
    {id: 1, nome: 'Coca-Cola com 10% desc.', 
     descricao: 'Valor: R$ 3,00', 
     preco: 3.00 - (3 * 0.1), 
     url: './assets/coca-cola.webp', 
     quantidade: 10, 
     promocao: true, 
     tipo: 'refrigerante 600ml'},

    {id: 2, nome: 'Guaraná', 
     descricao: 'Guaraná', 
     preco: 3.00, 
     url: './assets/guarana-600ml.jpg', 
     quantidade: 10, 
     promocao: false, 
     tipo: 'refrigerante 600ml'},

    {id: 3, 
     nome: 'Fanta', 
     descricao: 'Fanta Laranja', 
     preco: 3.00, 
     url: './assets/fanta-600-ml.jpg', 
     quantidade: 10, 
     promocao: false, 
     tipo: 'refrigerante 600ml'},

    {id: 4, 
     nome: 'Vinho Dona Paula com 20% desc.', 
     descricao: 'Valor: R$ 97,47.', 
     preco: 97.47  - (97.47 * 0.2), 
     url: './assets/vinho-dona-paula.jpg', 
     quantidade: 5, 
     promocao: true, 
     tipo: 'Cabernet Sauvignon'},

    {id: 5, 
     nome: 'Vinho Concha com 20% desc.', 
     descricao: 'Valor: R$ 43,00.', 
     preco: 43.00  - (43 * 0.2), 
     url: './assets/vinho-concha.jpg', 
     quantidade: 5, 
     promocao: true, 
     tipo: 'Cabernet Sauvignon'}
  ];

  private carrinho = [];
  private cartItemCount = new BehaviorSubject(0);//Para obter a contagem atual de produtos

  constructor() { }
  
  getProdutos() {
    return this.data;
  }

  getCarrinho() {
    return this.carrinho;
  }

  getcartItemCount() {
    return this.cartItemCount;
  }

  //Métodos CRUD
  adicionarProduto(produto) {
    let adicionado = false;
    for(let p of this.carrinho) {
      if(p.id === produto.id) {
        p.quantidade += 1;
        adicionado = true;
        break;
      }
    }
    if(!adicionado) {
      produto.quantidade = 1;
      this.carrinho.push(produto);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  
  subtrairProduto(produto) {
    for(let [index, p] of this.carrinho.entries()) {
      if(p.id === produto.id) {
        p.quantidade -= 1;
        if(p.quantidade == 0) {
          this.carrinho.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removerProduto(produto) {
    for(let[index, p] of this.carrinho.entries()) {
      if(p.id === produto.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.quantidade);
        this.carrinho.splice(index, 1);
      }
    }
  }
}
