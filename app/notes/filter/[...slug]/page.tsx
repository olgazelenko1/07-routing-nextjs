import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteResponse } from '@/types/noteResponse';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const filterTag = slug?.[0] || '';
  const tagForApi = filterTag === 'All' ? '' : filterTag;

  const initialData: NoteResponse = await fetchNotes(1, 12, '', tagForApi);

  return (
    <NotesClient
      page={1}
      perPage={12}
      search=""
      initialData={initialData}
      filterTag={tagForApi}
    />
  );
}

