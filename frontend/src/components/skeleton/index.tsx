import React, { useEffect, useState } from 'react';
import './index.scss';

/**
 * Tipagem para as propriedades do componente Skeleton.
 *
 * @interface SkeletonProps
 * @property {string} [width] - Define a largura de cada linha de esqueleto. Se não fornecido, o valor padrão será `100%`.
 * @property {string} [height] - Define a altura de cada linha de esqueleto. Se não fornecido, o valor padrão será `20px`.
 * @property {number} repeat - Define o número de linhas de esqueleto a serem renderizadas. É um valor obrigatório.
 */
type SkeletonProps = {
  width?: string;
  height?: string;
  repeat: number;
};

/**
 * Componente Skeleton utilizado para criar uma animação de carregamento simulada,
 * representando a estrutura de um esqueleto enquanto o conteúdo real é carregado.
 *
 * Este componente renderiza várias linhas de esqueleto com uma animação de "pulse".
 * O número de linhas, a largura e a altura podem ser configurados através das propriedades.
 *
 * @param {SkeletonProps} props - As propriedades para configurar o componente Skeleton.
 * @returns {JSX.Element} O JSX do componente Skeleton.
 */
const Skeleton: React.FC<SkeletonProps> = ({ width, height, repeat = 1 }) => {
  const [rows, setRows] = useState<number[]>([]);

  useEffect(() => {
    const r = [];
    for (let i = 0; i < repeat; i++) {
      r.push(i);
    }
    setRows(r);
  }, [repeat]);

  return (
    <div id="skeleton-container">
      {rows.map((row) => (
        <div
          className="skeleton"
          key={row}
          style={{ width: width || '100%', height: height || '20px' }}
        >
          <div className="pulse"></div>
        </div>
      ))}
    </div>
  );
};

export { Skeleton };
