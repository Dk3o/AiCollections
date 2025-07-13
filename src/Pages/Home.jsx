import React, { useState } from 'react';
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import AiToolList from "../Components/AiToolList";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar />
      <Search onSearch={setSearchTerm}/>
      <main>
        <AiToolList searchTerm={searchTerm} />
      </main>
    </>
  );
}