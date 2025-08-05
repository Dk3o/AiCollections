import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Search from '../Components/Search';
import AiToolList from '../Components/AiToolList';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  return (
    <>
      <Header />
      <Search 
        onSearch={setSearchTerm} 
        onTagFilterChange={setActiveTags} 
      />
      <main>
        <AiToolList 
          searchTerm={searchTerm} 
          activeTags={activeTags} />
      </main>
      <Footer />
    </>
  );
}
