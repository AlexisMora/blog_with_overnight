
const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Posts.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'admin', component: () => import('pages/Admin.vue') }, 
      { path: 'detailPost', component: () => import('pages/DetailPost.vue') },
    ]
  },
  {
    path: '/Admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Admin.vue') },
      { path: 'postform', component: () => import('pages/PostForm.vue') },
      { path: 'calculator', component: () => import('pages/CalorieCalculator.vue') },
      { path: 'mealcalculator', component: () => import('pages/MealCalculator.vue') }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
