import axios from 'axios';
import type { Note, NewNote } from '../types/note';
import type { NoteResponse } from '../types/noteResponse';

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export async function fetchNotes(
  page = 1,
  perPage = 12,
  search = ''
): Promise<NoteResponse> {
  const params: FetchNotesParams = { page, perPage };
  if (search.trim()) {
    params.search = search.trim();
  }

  const { data } = await instance.get<NoteResponse>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await instance.delete<Note>(`/notes/${noteId}`);
  return data;
}
