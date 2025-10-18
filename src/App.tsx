import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import PokemonSearch from './pages/PokemonSearch';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/search" element={<PokemonSearch />} />
        </Routes>
      </main>
      <Footer />
      <Navigation />
    </div>
  );
};

export default App;

