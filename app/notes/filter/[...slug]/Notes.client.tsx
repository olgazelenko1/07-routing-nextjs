'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from '../../../page.module.css'; // або css з твого шляху
import toast, { Toaster } from 'react-hot-toast';
import type { NoteResponse } from '@/types/noteResponse';
import type { Note } from '@/types/note';

interface NotesClientProps {
  initialData: NoteResponse;
  tag: string;
  perPage?: number;
}

export default function NotesClient({
  initialData,
  tag,
  perPage = 12,
}: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Скидаємо фільтри при зміні тега
  useEffect(() => {
    setSearch('');
    setInputValue('');
    setCurrentPage(1);
  }, [tag]);

  // Дебаунс пошуку
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // Запит нотаток
  const { data, isLoading, isError, isSuccess } = useQuery<NoteResponse>({
    queryKey: ['notes', currentPage, search, tag],
    queryFn: () => fetchNotes(currentPage, perPage, search, tag),
    initialData: currentPage === 1 && search === '' ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  // Тост при відсутності нотаток
  useEffect(() => {
    if (isSuccess && !isLoading && notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, isLoading, notes.length]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.wrapper}>
      <Toaster position="top-center" />
      <header className={css.header}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.centered}>Loading, please wait...</p>}
      {isError && <p className={css.centered}>Something went wrong.</p>}

      {notes.length === 0 && !isLoading && (
        <p className={css.centered}>No notes found.</p>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}

      {totalPages > 1 && (
        <div className={css.centered}>
          <Pagination
            page={currentPage}
            pageCount={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
