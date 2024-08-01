/* eslint-disable @next/next/no-img-element */
"use client"
import "../Styles/main.scss";
import { Provider } from 'react-redux';
import store from '../store';
import { AnimatePresence } from 'framer-motion'
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";


export default function RootLayout({ children }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
    <Provider store={store}>
    <html lang="en">
      <body className="main">
        <Header />
        {children}
        <Footer/>
        </body>
    </html>
    </Provider>
    </AnimatePresence>
  );
}



