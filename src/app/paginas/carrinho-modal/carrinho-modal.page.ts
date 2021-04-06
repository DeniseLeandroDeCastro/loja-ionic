import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CarrinhoService, Produto } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho-modal',
  templateUrl: './carrinho-modal.page.html',
  styleUrls: ['./carrinho-modal.page.scss'],
})
export class CarrinhoModalPage implements OnInit {

  carrinho: Produto[] = [];

  constructor(private carrinhoService: CarrinhoService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.carrinho = this.carrinhoService.getCarrinho();
  }

  subtrairProdutoItem(produto) {
    this.carrinhoService.subtrairProduto(produto);
  }

  adicionarProdutoItem(produto) {
    this.carrinhoService.adicionarProduto(produto);
  }

  removerProdutoItem(produto) {
    this.carrinhoService.removerProduto(produto);
  }

  getTotal() {
    return this.carrinho.reduce((i, j)=> i + j.preco * j.quantidade, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    let alert = await this.alertCtrl.create({
      header: 'Agradecemos a preferência!',
      message: 'FIQUE EM CASA E SE PRECISAR SAIR USE MÁSCARA!',
      buttons: ['OK']
    });
    alert.present().then(()=>{
      this.modalCtrl.dismiss();
    });
  }
}
