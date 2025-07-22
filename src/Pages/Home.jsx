import React, { useState } from 'react';
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import AiToolList from "../Components/AiToolList";
import Footer from "../Components/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  return (
    <>
      <Navbar />
      <Search
        onSearch={setSearchTerm}
        onTagFilterChange={setActiveTags}
      />
      <main>
        <AiToolList
          searchTerm={searchTerm}
          activeTags={activeTags}
        />
      </main>
      <Footer />
    </>
  );
}