import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteResponse } from "@/types/noteResponse";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByTags({ params }: PageProps) {
  const { slug } = await params;

  const page = 1;
  const perPage = 12;
  const search = "";
  const tag = slug[0] === "all" ? undefined : slug[0];

  const initialData: NoteResponse = await fetchNotes(page, perPage, search, tag);

  return <NotesClient initialData={initialData} tag={tag || "All"} />;
}

