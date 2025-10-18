// src/pages/PokemonSearch.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonListWithJapaneseNames } from '../api/pokemonWithJapaneseName';
import { apiQueryKeys } from '../queryKeys';
import PokemonCard from '../components/PokemonCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PokemonSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: pokemonListData, isLoading, error } = useQuery({
    queryKey: [apiQueryKeys.pokemon.list],
    queryFn: () => fetchPokemonListWithJapaneseNames(0, 151), // 第一世代のポケモンを取得
  });

  const pokemonList = pokemonListData?.results;

  // 検索結果をフィルタリング
  const filteredPokemon = useMemo(() => {
    if (!pokemonList || !searchTerm.trim()) {
      return pokemonList || [];
    }

    const term = searchTerm.toLowerCase().trim();
    return pokemonList.filter((pokemon) => 
      pokemon.japaneseName.includes(searchTerm) || // 日本語名での検索
      pokemon.name.toLowerCase().includes(term) || // 英語名での検索
      pokemon.number.includes(term) // 図鑑番号での検索
    );
  }, [pokemonList, searchTerm]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  if (error instanceof Error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500">エラー: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-4">ポケモン検索</h1>
        
        {/* 検索バー */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="ポケモン名、英語名、またはIDで検索..."
            className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">🔍</span>
          </div>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              <span>✕</span>
            </button>
          )}
        </div>

        {/* 検索結果カウント */}
        {!isLoading && (
          <div className="text-center mt-4 text-gray-600">
            {searchTerm ? (
              <span>
                「{searchTerm}」の検索結果: {filteredPokemon.length}件
              </span>
            ) : (
              <span>全{pokemonList?.length || 0}匹のポケモン</span>
            )}
          </div>
        )}
      </div>

      {/* 検索結果 */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <Skeleton circle={true} width={96} height={96} className="mx-auto mb-2" />
              <Skeleton width="100%" height={20} className="mb-1" />
              <Skeleton width="60%" height={16} />
            </div>
          ))}
        </div>
      ) : filteredPokemon.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.number} pokemon={pokemon} />
          ))}
        </div>
      ) : searchTerm ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😅</div>
          <div className="text-xl text-gray-600 mb-2">検索結果が見つかりません</div>
          <div className="text-gray-500">別のキーワードで検索してみてください</div>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonSearch;