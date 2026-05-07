# 🐟 Frutos do Mar — Cardápio Online

Cardápio digital interativo para restaurante de frutos do mar. Single Page Application com carrinho de compras e pedidos via WhatsApp.

## 🚀 Funcionalidades

- **Cardápio visual** com 30 pratos divididos em 6 categorias
- **Navegação por abas** (Entradas, Peixes, Camarões, Massas, Sobremesas, Bebidas)
- **Carrinho lateral** com controle de quantidade e cálculo automático
- **Envio de pedido via WhatsApp** com mensagem formatada por categoria
- **Design responsivo** — funciona em mobile, tablet e desktop
- **Animações fluidas** (fade-in, hover, slide, toast)
- **Persistência local** — carrinho salvo no navegador (localStorage)

## 🛠️ Stack

- **HTML5** — estrutura semântica
- **CSS3** — flexbox, grid, variáveis, animações, media queries
- **JavaScript** — vanilla (sem frameworks)

## 📁 Estrutura do Projeto

```
cardapio-frutos-do-mar/
├── index.html          # Página principal (SPA)
├── css/
│   └── style.css       # Estilos com tema oceano
├── js/
│   ├── data.js         # 30 pratos com dados completos
│   ├── cart.js         # Lógica do carrinho + WhatsApp
│   └── app.js          # Renderização, tabs, eventos
├── README.md
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Profundo | `#0B3B60` | Header, botões, títulos |
| Azul Médio | `#1A6B9A` | Hover, detalhes |
| Dourado | `#F59E0B` | Acentos, badge |
| Fundo | `#F0F4F8` | Background da página |

## 📦 Dados dos Pratos

Os 30 pratos estão em `js/data.js`. Cada prato segue esta estrutura:

```js
{
  id: 1,
  name: "Moqueca Baiana",
  category: "peixes",
  ingredients: ["Peixe Fresco", "Leite de Coco", "Dendê"],
  price: 89.90,
  description: "Moqueca tradicional baiana..."
}
```

Para alterar basta editar o arquivo `js/data.js`.

## 💬 Mensagem do WhatsApp

O pedido é enviado com os itens agrupados por categoria:

```
🐟 FRUTOS DO MAR — Pedido
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

🥗 ENTRADAS
   2x Camarão na Moranga — R$ 109,80

🐟 PEIXES
   1x Moqueca Baiana — R$ 89,90

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
💰 Total: R$ 199,70
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

📍 Retirada no local
🕐 Seg-Dom: 11h às 23h

Obrigado pelo pedido! 🐟❤️
```

## 🚀 Como Usar

1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` no navegador
3. Ou use um servidor local:

```bash
cd cardapio-frutos-do-mar
python -m http.server 3000
```

## ⚙️ Personalização

| Item | Arquivo |
|------|---------|
| Número do WhatsApp | `js/cart.js` — variável `phone` |
| Dados dos pratos | `js/data.js` |
| Cores do tema | `css/style.css` — variáveis `:root` |
| Textos e contatos | `index.html` — footer |

## 📱 Responsividade

- **Mobile** (< 768px): 1 coluna, carrinho em tela cheia
- **Tablet** (768–1024px): 2 colunas
- **Desktop** (> 1024px): 3 colunas
