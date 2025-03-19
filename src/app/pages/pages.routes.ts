import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleListComponent } from './article-list/article-list.component';

export default [
  { path: 'crud', component: CrudComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'article-list', component: ArticleListComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
