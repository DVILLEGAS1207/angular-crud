import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  dialogVisible = false;
  editMode = false;
  currentArticle: Article = this.getEmptyArticle();

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService
      .getArticles()
      .subscribe((articles) => (this.articles = articles));
  }

  getEmptyArticle(): Article {
    return {
      id: 0,
      title: '',
      description: '',
      body: '',
      published: false,
    };
  }

  showDialog() {
    this.editMode = false;
    this.currentArticle = this.getEmptyArticle();
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }

  editArticle(article: Article) {
    this.editMode = true;
    this.currentArticle = { ...article };
    this.dialogVisible = true;
  }

  saveArticle() {
    if (this.editMode) {
      this.articleService
        .updateArticle(this.currentArticle.id!, this.currentArticle)
        .subscribe(() => {
          this.loadArticles();
          this.hideDialog();
        });
    } else {
      this.articleService.createArticle(this.currentArticle).subscribe(() => {
        this.loadArticles();
        this.hideDialog();
      });
    }
  }

  deleteArticle(article: Article) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.articleService.deleteArticle(article.id!).subscribe(() => {
        this.loadArticles();
      });
    }
  }
}
