import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CarrinhoModalPage } from '../paginas/carrinho-modal/carrinho-modal.page';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  carrinho = [];
  produtos = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private CarrinhoService: CarrinhoService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.produtos = this.CarrinhoService.getProdutos();
    this.carrinho = this.CarrinhoService.getCarrinho();
    this.cartItemCount = this.CarrinhoService.getcartItemCount();
  }

  adicionarAoCarrinho(produto) {
    this.CarrinhoService.adicionarProduto(produto);
  }

  async abrirCarrinho() {

    let modal = await this.modalCtrl.create({
      component: CarrinhoModalPage,
      cssClass: 'carrinho-modal'
    });
    modal.present(); 
  }

}
