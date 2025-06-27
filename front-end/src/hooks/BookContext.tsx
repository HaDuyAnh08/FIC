import React, { createContext, useContext, useState } from 'react';
   import type { Book } from '../types/bookType';

   interface BookContextType {
     books: Book[];
     setBooks: (books: Book[]) => void;
   }

   const BookContext = createContext<BookContextType | undefined>(undefined);

   export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [books, setBooks] = useState<Book[]>([]);

     return (
       <BookContext.Provider value={{ books, setBooks }}>
         {children}
       </BookContext.Provider>
     );
   };

   export const useBook = () => {
     const context = useContext(BookContext);
     if (!context) {
       throw new Error('useBook must be used within a BookProvider');
     }
     return context;
   };