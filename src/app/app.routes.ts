import { Routes } from '@angular/router';
import { NotFound404Component } from '../pages/404/404.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
    import('./../pages/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
        import('./../pages/home/home.component')
            .then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
        import('./../pages/about/about.component')
            .then(m => m.AboutComponent)
  },
  {
    path: 'program',
    loadComponent: () =>
        import('../pages/product/product.component')
            .then(m => m.ProductComponent)
  },
  {
    path: 'program/:id',
    pathMatch: 'full',
    loadComponent: () =>
        import('../pages/product/detail/detail.component')
            .then(m => m.DetailComponent)
  },
  {
    path: 'news',
    loadComponent: () =>
        import('./../pages/news/news.component')
            .then(m => m.NewsComponent)
  },
  {
    path: 'news/:id',
    pathMatch: 'full',
    loadComponent: () =>
        import('./../pages/news/detail/detail.component')
            .then(m => m.DetailComponent)
  },
  {
    path: 'knowledge',
    loadComponent: () =>
        import('./../pages/knowledge/knowledge.component')
            .then(m => m.KnowledgeComponent)
  },
  {
    path: 'knowledge/:id',
    pathMatch: 'full',
    loadComponent: () =>
        import('./../pages/knowledge/detail/detail.component')
            .then(m => m.DetailComponent)
  },
  { path: '**', component: NotFound404Component }
];
