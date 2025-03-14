import { Component } from '@angular/core';
import { Product, ProductService } from '../../../../services/product.service';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recentsaleswidget',
  imports: [CommonModule, TableModule, ButtonModule, RippleModule],
  templateUrl: './recentsaleswidget.component.html',
  styleUrl: './recentsaleswidget.component.css',
  providers: [ProductService],
})
export class RecentsaleswidgetComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));
  }
}
