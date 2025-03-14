// import { Component, OnInit } from '@angular/core';
// import { CommonModule, NgOptimizedImage } from '@angular/common';
// import {
//   FormsModule,
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// // PrimeNG Modules
// import { TableModule } from 'primeng/table';
// import { ToastModule } from 'primeng/toast';
// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { TextareaModule } from 'primeng/textarea';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { CarouselModule } from 'primeng/carousel';
// import { RippleModule } from 'primeng/ripple';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { ProductService } from '../../services/product.service';
// import { Product } from '../../models/product.model';

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     TableModule,
//     ToastModule,
//     ToolbarModule,
//     ButtonModule,
//     DialogModule,
//     InputTextModule,
//     InputNumberModule,
//     TextareaModule,
//     ConfirmDialogModule,
//     CarouselModule,
//     RippleModule,
//     NgOptimizedImage,
//   ],
//   providers: [MessageService, ConfirmationService],
//   templateUrl: './product-list.component.html',
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   product: Product = {} as Product;
//   productDialog: boolean = false;
//   submitted: boolean = false;
//   productForm!: FormGroup;
//   formOperation: 'nuevo' | 'editar' = 'nuevo';

//   constructor(
//     private productService: ProductService,
//     private messageService: MessageService,
//     private confirmationService: ConfirmationService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//     this.initForm();
//   }

//   initForm(): void {
//     this.productForm = this.fb.group({
//       id: [0],
//       title: ['', [Validators.required]],
//       price: [0, [Validators.required, Validators.min(0)]],
//       description: ['', [Validators.required]],
//       categoryId: [0, [Validators.required]],
//       images: [[]],
//     });
//   }

//   loadProducts(): void {
//     this.productService.getProducts().subscribe({
//       next: (data) => {
//         this.products = data.map((product) => {
//           return {
//             ...product,
//             images: this.processImages(product.images),
//           };
//         });
//       },
//       error: (error) => {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Error',
//           detail: 'Failed to load products',
//           life: 3000,
//         });
//         console.error('Error loading products:', error);
//       },
//     });
//   }

//   processImages(images: any): string[] {
//     if (!images || !images.length) return [];

//     try {
//       // Si images ya es un array de strings
//       if (Array.isArray(images) && typeof images[0] === 'string') {
//         // Verifica si el primer elemento contiene JSON anidado
//         if (images[0].startsWith('[')) {
//           try {
//             const parsedImages = JSON.parse(images[0]);
//             if (Array.isArray(parsedImages)) {
//               return parsedImages.map((img: string) =>
//                 this.cleanupImageUrl(img)
//               );
//             }
//           } catch (e) {
//             console.error('Failed to parse nested JSON string:', e);
//           }
//         }
//         // De lo contrario, limpia cada URL de imagen
//         return images.map((img: string) => this.cleanupImageUrl(img));
//       }

//       // Si images es una string que representa un array JSON
//       if (
//         typeof images === 'string' &&
//         (images.startsWith('[') || images.startsWith('"['))
//       ) {
//         try {
//           const cleanedImagesStr = images.replace(/^"|"$/g, '');
//           const parsedImages = JSON.parse(cleanedImagesStr);
//           if (Array.isArray(parsedImages)) {
//             return parsedImages.map((img: string) => this.cleanupImageUrl(img));
//           }
//         } catch (e) {
//           console.error('Failed to parse images string:', e);
//         }
//       }

//       return [];
//     } catch (error) {
//       console.error('Error processing images:', error);
//       return [];
//     }
//   }

//   cleanupImageUrl(url: string): string {
//     if (!url) return '';
//     return url.replace(/^"/, '').replace(/"$/, '');
//   }

//   openNew(): void {
//     this.formOperation = 'nuevo';
//     this.productForm.reset();
//     this.submitted = false;
//     this.productDialog = true;
//   }

//   editProduct(product: Product): void {
//     this.formOperation = 'editar';
//     this.productForm.patchValue({ ...product });
//     this.productDialog = true;
//   }

//   deleteProduct(product: Product): void {
//     this.confirmationService.confirm({
//       message: `Are you sure you want to delete ${product.title}?`,
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.productService.deleteProduct(product.id).subscribe({
//           next: () => {
//             this.loadProducts();
//             this.messageService.add({
//               severity: 'success',
//               summary: 'Success',
//               detail: 'Product deleted',
//               life: 3000,
//             });
//           },
//           error: (error) => {
//             this.messageService.add({
//               severity: 'error',
//               summary: 'Error',
//               detail: 'Failed to delete product',
//               life: 3000,
//             });
//             console.error('Error deleting product:', error);
//           },
//         });
//       },
//     });
//   }

//   hideDialog(): void {
//     this.productDialog = false;
//     this.submitted = false;
//   }

//   saveProduct(): void {
//     this.submitted = true;

//     if (this.productForm.invalid) {
//       return;
//     }

//     const productData = this.productForm.value;

//     if (this.formOperation === 'editar') {
//       this.productService.updateProduct(productData.id, productData).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.messageService.add({
//             severity: 'success',
//             summary: 'Success',
//             detail: 'Product updated',
//             life: 3000,
//           });
//           this.hideDialog();
//         },
//         error: (error) => {
//           this.messageService.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: 'Failed to update product',
//             life: 3000,
//           });
//           console.error('Error updating product:', error);
//         },
//       });
//     } else {
//       const { id, ...newProduct } = productData;
//       this.productService.createProduct(newProduct).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.messageService.add({
//             severity: 'success',
//             summary: 'Success',
//             detail: 'Product created',
//             life: 3000,
//           });
//           this.hideDialog();
//         },
//         error: (error) => {
//           this.messageService.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: 'Failed to create product',
//             life: 3000,
//           });
//           console.error('Error creating product:', error);
//         },
//       });
//     }
//   }
// }
