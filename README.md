# 🌤️ Diário do Xixi na Cama

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Capacitor-7.4.2-119EFF?style=flat-square&logo=capacitor" alt="Capacitor"/>
  <img src="https://img.shields.io/badge/PWA-Ready-4CAF50?style=flat-square" alt="PWA"/>
</div>

Um aplicativo Progressive Web App (PWA) amigável para crianças registrarem dias secos e episódios de enurese noturna (xixi na cama). Permite que pais e cuidadores acompanhem o progresso das crianças de forma visual e positiva.

## ✨ Características

### 🎯 **Interface Amigável para Crianças**
- **Símbolos visuais intuitivos**: Sol ☀️ para dias secos, Chuva 🌧️ para xixi na cama
- **Design colorido e atrativo** com feedback visual imediato
- **Interface simples** adaptada para uso infantil com supervisão dos pais

### 📱 **Progressive Web App (PWA)**
- **Funciona 100% offline** após primeira instalação
- **Instalável** em dispositivos móveis e desktop
- **Service Worker** para cache automático
- **Manifest** configurado para experiência nativa

### 📊 **Recursos de Acompanhamento**
- **Calendário interativo** com navegação mensal
- **Visualização dos últimos 5 dias** na tela inicial
- **Status do dia atual** em destaque
- **Exportação para CSV** dos dados registrados
- **Armazenamento local** seguro (localStorage)

### 📱 **Multiplataforma**
- **Web PWA** para navegadores modernos
- **App Android nativo** via Capacitor
- **Responsivo** para tablets e smartphones

## 🛠️ Tecnologias

### **Frontend**
- **React 19.1.1** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3.4.17** - Estilização utilitária
- **Vite 6.2.0** - Build tool e dev server

### **Mobile & PWA**
- **Capacitor 7.4.2** - Framework híbrido
- **Service Worker** - Cache offline
- **Web App Manifest** - Instalação PWA

### **Ferramentas de Desenvolvimento**
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Compatibilidade de navegadores
- **Hot Module Replacement** - Desenvolvimento rápido

## 🚀 Como Usar

### **Para Pais/Cuidadores:**

1. **Registro Diário**: Ajude a criança a marcar o dia como:
   - ☀️ **Dia Seco**: Acordou com a cama seca
   - 🌧️ **Xixi na Cama**: Episódio de enurese noturna

2. **Acompanhamento**: Visualize o progresso através de:
   - Tela inicial com status dos últimos 5 dias
   - Calendário mensal completo
   - Padrões visuais de melhora

3. **Dados**: Exporte registros em CSV para compartilhar com pediatras

### **Interface:**

#### 🏠 **Tela Inicial**
- Status do dia atual em destaque
- Últimos 5 dias em resumo visual
- Botões grandes para registro fácil

#### 📅 **Calendário**
- Navegação por mês/ano
- Cores visuais por status
- Clique em qualquer dia para editar

#### 📤 **Exportação**
- Formato CSV compatível com Excel
- Dados ordenados por data
- Pronto para análise médica

## 🔧 Instalação e Desenvolvimento

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Android Studio (para build Android)

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/ricardoapaes/xixi-cama.git
cd diario-do-xixi

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Comandos Disponíveis**
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

### **Build Android**
```bash
# Build web
npm run build

# Sincronizar com Capacitor
npx cap sync android

# Abrir no Android Studio
npx cap open android
```

## 📱 Como Instalar o PWA

### **No Smartphone:**
1. Abra o app no navegador
2. Toque no menu do navegador
3. Selecione "Adicionar à tela inicial"
4. Confirme a instalação

### **No Desktop:**
1. Abra o app no Chrome/Edge
2. Clique no ícone de instalação na barra de endereço
3. Confirme "Instalar"

## 🗂️ Estrutura do Projeto

```
diario-do-xixi/
├── components/           # Componentes React
│   ├── Calendar.tsx     # Calendário mensal
│   ├── DayCell.tsx      # Célula de dia individual
│   ├── Header.tsx       # Cabeçalho com navegação
│   ├── Home.tsx         # Tela inicial
│   ├── Icons.tsx        # Ícones SVG (Sol, Chuva, Nuvem)
│   └── StatusModal.tsx  # Modal para alterar status
├── hooks/               # Custom hooks
│   └── useLocalStorage.ts # Persistência local
├── android/             # Projeto Android (Capacitor)
├── public/              # Arquivos estáticos
│   ├── manifest.json    # Manifest PWA
│   └── sw.js           # Service Worker
├── types.ts            # Tipos TypeScript
├── App.tsx             # Componente raiz
├── index.tsx           # Ponto de entrada
└── index.html          # HTML base
```

## 💾 Armazenamento de Dados

### **Formato dos Dados**
```typescript
interface LogData {
  [date: string]: LogStatus; // "YYYY-MM-DD": "DRY" | "WET"
}

enum LogStatus {
  Dry = 'DRY',    // Dia seco
  Wet = 'WET',    // Xixi na cama
}
```

### **Exemplo**
```json
{
  "2025-09-10": "DRY",
  "2025-09-11": "WET",
  "2025-09-12": "DRY"
}
```

## 🎨 Design System

### **Cores Principais**
- **Azul**: `#3b82f6` - Tema principal
- **Amarelo**: `#fbbf24` - Dias secos (sol)
- **Azul claro**: `#60a5fa` - Xixi na cama (chuva)
- **Cinza**: `#9ca3af` - Dias sem registro

### **Iconografia**
- ☀️ **Sol**: Dias secos, progresso positivo
- 🌧️ **Chuva**: Episódios de enurese
- ☁️ **Nuvem**: Dias sem registro
- 📅 **Calendário**: Navegação temporal

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🧑‍⚕️ Nota Médica

Este aplicativo é uma ferramenta de acompanhamento e **não substitui orientação médica profissional**. Para casos persistentes de enurese noturna, consulte um pediatra ou urologista pediátrico.
