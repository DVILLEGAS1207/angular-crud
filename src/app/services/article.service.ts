import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/articles';
  private http = inject(HttpClient);
  constructor() {}
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }
  getDrafts(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/drafts`);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
  createArticle(article: Omit<Article, 'id'>): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }
  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.patch<Article>(`${this.apiUrl}/${id}`, article);
  }
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
