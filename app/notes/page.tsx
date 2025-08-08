import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const page = 1;
  const perPage = 12;
  const search = '';

  const initialData = await fetchNotes(page, perPage, search);

  return (
    <NotesClient
      page={page}
      perPage={perPage}
      search={search}
      initialData={initialData}
    />
  );
}