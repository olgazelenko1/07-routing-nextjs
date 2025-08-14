'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.client.module.css';

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back(); 
  };

  if (isLoading) return null; 
  if (error || !note) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </Modal>
  );
};

export default NotePreview;
