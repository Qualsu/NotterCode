"use client"

import React, { useState } from 'react';
import { CodeEditor } from "./components/editor";
import { Navigation } from "./components/navigation";
import { Navbar } from './components/navbar';

export default function Home() {
  const [navWidth, setNavWidth] = useState(300);

  return (
    <>
      <Navbar/>
      <div className="flex bg-zinc-900 h-screen">
        <Navigation width={navWidth} setWidth={setNavWidth} />
        <div className="flex-grow">
          <CodeEditor />
        </div>
      </div>
    </>
  );
}