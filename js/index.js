const routes = {
  '/': 'pages/home.html',
  '/universo': '/pages/universo.html',
  '/exploracao': '/pages/exploracao.html',
  404: '/pages/404.html'
}

function route(event) {
  event = event || window.event
  event.preventDefault()

  // quando clicar num botao que leve a mesma página atual, não fazer nada, 
  // para que não entre no histórico e quando clicar na setinha pra voltar, também não volte pra mesma página
  const { pathname } = window.location
  let urlComparison = 'http://localhost:3000' + pathname
  //console.log('urlComparison: ', urlComparison)
  //console.log('event.target.href: ', event.target.href)
  if (urlComparison !== event.target.href) {
    window.history.pushState({}, '', event.target.href)
  }

  handle()
}

function handle() {
  const { pathname } = window.location

  let route = routes[pathname] || routes[404]
  fetch(route)
  .then(data => data.text())
  .then(html => {
    const page = document.getElementById('page')
    page.innerHTML = html
  })

  // para mudar a imagem de fundo
  switch(pathname) {
    case '/':
      document.body.classList.add('bg-home')
      document.body.classList.remove('bg-universo')
      document.body.classList.remove('bg-exploracao')
      break;
    case '/universo':
      document.body.classList.add('bg-universo')
      document.body.classList.remove('bg-home')
      document.body.classList.remove('bg-exploracao')
      break;
    case '/exploracao':
      document.body.classList.add('bg-exploracao')
      document.body.classList.remove('bg-home')
      document.body.classList.remove('bg-universo')
      break;
    default:
      document.body.classList.add('bg-home')
      document.body.classList.remove('bg-universo')
      document.body.classList.remove('bg-exploracao')
      break;
  }

}

function queroSaberMais() {
  //teste:
  //console.log('apertou o botao')
  //determina a rota:
  let route = '/pages/universo.html'
  //busca os dados na rota:
  fetch(route)
  .then(data => data.text())
  .then(html => {
    const page = document.getElementById('page')
    page.innerHTML = html
  })

  //atualiza a url:
  window.history.pushState({}, '', '/universo')

  document.body.classList.add('bg-universo')
  document.body.classList.remove('bg-home')
  document.body.classList.remove('bg-exploracao')
}

handle()

window.onpopstate = () => handle()
window.route = () => route();
window.queroSaberMais = () => queroSaberMais();