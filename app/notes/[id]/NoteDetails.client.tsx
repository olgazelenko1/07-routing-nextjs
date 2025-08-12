// NoteDetails.client.tsx
'use client';

import { useQuery, HydrationBoundary } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  noteId: string;
  dehydratedState: DehydratedState;
}

export default function NoteDetailsClient({ noteId, dehydratedState }: NoteDetailsClientProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetails noteId={noteId} />
    </HydrationBoundary>
  );
}

function NoteDetails({ noteId }: { noteId: string }) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
