import SidebarNotes from './@sidebar/SidebarNotes/SidebarNotes';
import styles from './LayoutNotes.module.css';

export default function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
