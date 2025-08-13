// 'use client';

// import React, { ReactNode, useState } from 'react';
// import Link from 'next/link';
// import css from '../TagsMenu/TagsMenu.module.css';

// interface TagsMenuProps {
//   tags?: string[];
//   children?: ReactNode;
// }

// export default function TagsMenu({ tags = [], children }: TagsMenuProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div className={css.menuContainer}>
//       <button onClick={toggle} className={css.menuButton}>
//         Notes ▾
//       </button>
//       {isOpen && (
//         <ul className={css.menuList}>
//           <li className={css.menuItem}>
//             <Link href="/notes/filter" className={css.menuLink} onClick={toggle}>
//               All notes
//             </Link>
//           </li>
//           {tags.map(tag => (
//             <li key={tag} className={css.menuItem}>
//               <Link
//                 href={`/notes/filter/${encodeURIComponent(tag)}`}
//                 className={css.menuLink}
//                 onClick={toggle}
//               >
//                 {tag}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//       {children}
//     </div>
//   );
// }
// components/TanStackProvider/TanStackProvider.tsx
"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanStackProviderProps {
  children: React.ReactNode;
}

const TanStackProvider: React.FC<TanStackProviderProps> = ({ children }) => {
  // Створюємо QueryClient один раз на клієнті
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
