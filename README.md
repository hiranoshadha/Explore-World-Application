# 🌍 Explore World - Interactive Country Explorer

  🚀 Features | 
  ⚙️ Installation | 
  📖 Usage


## ✨ Overview

**Explore World** is a beautiful, interactive application that lets you discover countries around the globe with rich visualizations and engaging features. Built with modern web technologies, it offers an immersive experience for geography enthusiasts and casual explorers alike.

## 🚀 Features

- **🔄 Interactive Country Cards**: Flip cards with smooth animations to reveal detailed information
- **🌙 Dark/Light Mode**: Seamless theme switching with beautiful color palettes
- **❤️ Favorites System**: Save and manage your favorite countries with user authentication
- **🧩 Country Comparison**: Compare statistics between any two countries
- **🎮 Geography Quiz**: Test your knowledge with our built-in country quiz
- **🌐 3D Globe Visualization**: Explore countries on an interactive 3D globe
- **🔤 Multi-language Support**: Interface available in English, Sinhala, and Tamil
- **📱 Fully Responsive**: Beautiful experience on any device size

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22630384.git

# Navigate to project directory
cd explore-world

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Build Process

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build process will generate optimized files in the `dist` directory, ready for deployment.

## 📖 Usage

After starting the development server, open your browser and navigate to `http://localhost:5173`. From there you can:

- Browse countries by region using the region filter buttons
- Search for specific countries using the search bar
- Click on country cards to view detailed information
- Toggle between light and dark mode using the theme switch
- Create an account to save your favorite countries
- Compare statistics between countries
- Test your geography knowledge with the built-in quiz

## 🧰 Tech Stack


  
    
      
        
        React
      
      
        
        Tailwind CSS
      
      
        
        Vite
      
      
        
        Framer Motion
      
    
  


- **Frontend Framework**: React with functional components and hooks
- **Styling**: Tailwind CSS for utility-first styling
- **Build Tool**: Vite for fast development and optimized production builds
- **Animations**: Framer Motion for smooth, physics-based animations
- **Routing**: React Router for navigation
- **State Management**: Context API with custom hooks
- **3D Visualization**: react-globe.gl (Three.js)
- **API Integration**: REST Countries API
- **Authentication**: Custom implementation with localStorage
- **Testing**: Jest and React Testing Library

## 📊 Project Structure

```
explore-world/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   ├── ui/             # Basic UI elements
│   │   ├── features/       # Feature-specific components
│   │   └── auth/           # Authentication components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API and external services
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## 🌟 Key Features in Detail

### Interactive Country Cards

Our country cards feature a beautiful flip animation that reveals additional information on hover. The front shows the country flag, name, and region, while the back displays population, languages, and a details button.

### 3D Globe Visualization

The interactive 3D globe allows you to visualize countries in a spatial context. Points on the globe represent countries, with size proportional to population. Click on any point to navigate to that country's detail page.

### User Authentication

Create an account to save your favorite countries and access them across devices. Our authentication system uses localStorage for simplicity while maintaining a great user experience.

## 🚀 Deployment

This project can be easily deployed to various hosting platforms:

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [REST Countries API](https://restcountries.com/) for providing the country data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [React Globe.gl](https://github.com/vasturiano/react-globe.gl) for the 3D globe visualization
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set

---


  Made with ❤️ by Hiran Oshadha
