import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Article } from '../../models/article.model';
import { Table, TableModule } from 'primeng/table';
import { ArticleService } from '../../services/article.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-articles',
  imports: [
    ButtonModule,
    FormsModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    DialogModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule
],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  providers: [MessageService, ConfirmationService, ArticleService],
})
export class ArticlesComponent implements OnInit {
  articleDialog: boolean = false;
  articles = signal<Article[]>([]);
  article!: Article;
  selectedArticles!: Article[] | null;
  submitted: boolean = false;
  statuses!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];

  constructor(
    private articleService: ArticleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnInit() {
    this.loadArticlesData();
  }

  loadArticlesData() {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles.set(articles);
    });

    this.statuses = [
      { label: 'PUBLICADO', value: true },
      { label: 'NO PUBLICADO', value: false },
    ];

    this.cols = [
      { field: 'title', header: 'Titulo', customExportHeader: 'Article Title' },
      { field: 'description', header: 'Descripcion' },
      { field: 'body', header: 'Cuerpo' },
      { field: 'published', header: 'Publico' },
      { field: 'authorId', header: 'Autor' },
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.article = {
      id: 0,
      title: '',
      description: '',
      body: '',
      published: false,
      authorId: 0,
    };
    this.submitted = false;
    this.articleDialog = true;
  }

  editArticle(article: Article) {
    this.article = { ...article };
    this.articleDialog = true;
  }

  deleteSelectedArticles() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected articles?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.articles.set(
          this.articles().filter((val) => !this.selectedArticles?.includes(val))
        );
        this.selectedArticles = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Articles Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.articleDialog = false;
    this.submitted = false;
  }

  deleteArticle(article: Article) {
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar "${article.title}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.articleService.deleteArticle(article.id).subscribe(() => {
          this.articles.set(
            this.articles().filter((val) => val.id !== article.id)
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: `El artículo "${article.title}" ha sido eliminado`,
            life: 3000,
          });
        });
      },
    });
  }

  getSeverity(published: boolean) {
    return published ? 'success' : 'danger';
  }

  saveArticles() {
    this.submitted = true;

    if (!this.article.title?.trim()) return;

    if (this.article.id) {
      // Actualización
      this.articleService
        .updateArticle(this.article.id, this.article)
        .subscribe((updatedArticle) => {
          this.articles.set(
            this.articles().map((val) =>
              val.id === updatedArticle.id ? updatedArticle : val
            )
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: `Artículo "${updatedArticle.title}" actualizado con éxito`,
            life: 3000,
          });

          this.closeDialog();
        });
    } else {
      // Creación
      const newArticle: Omit<Article, 'id'> = {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        authorId: this.article.authorId,
        published: this.article.published,
      };

      this.articleService
        .createArticle(newArticle)
        .subscribe((createdArticle) => {
          this.articles.set([...this.articles(), createdArticle]);

          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: `Artículo "${createdArticle.title}" creado con éxito`,
            life: 3000,
          });

          this.closeDialog();
        });
    }
  }

  // Método auxiliar para cerrar el diálogo y resetear el formulario
  private closeDialog() {
    this.articleDialog = false;
    this.article = {
      id: 0,
      title: '',
      description: '',
      body: '',
      authorId: 0,
      published: false,
    };
  }
}
