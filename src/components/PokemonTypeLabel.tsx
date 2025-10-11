// src/components/pokemonTypeLabel.tsx
// ポケモンのタイプのラベル
import { pokemonTypesMap } from '../pokemonTypesMap';

type PokemonTypeLabelProps = {
  pokemonType: string;
};

const PokemonTypeLabel: React.FC<PokemonTypeLabelProps> = ({ pokemonType }) => {
  const typeInfo = pokemonTypesMap.find((t) => t.jaType === pokemonType);
  return (
    <span 
      style={{
        backgroundColor: typeInfo?.color,
      }}
      className={`text-white px-3 py-1 rounded-full w-fit`}
    >
      {typeInfo?.jaType}
    </span>
  );
};

export default PokemonTypeLabel;
