// src/components/Navigation.tsx
import React from 'react';
// useLocation をインポート
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  // window.location.pathname の代わりに useLocation() を使用
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-100 p-4">
      <ul className="flex space-x-4">
        {/* 一覧画面の場合は一覧ボタンを非表示 */}
        {
          pathname !== '/' && (
            <li>
              <Link to="/" className="text-blue-500 hover:underline text-decoration-none">{"< "}一覧</Link>
            </li>
          )
        }
        {/* 追加のナビゲーションリンクをここに記載 */}
      </ul>
    </nav>
  );
};

export default Navigation;