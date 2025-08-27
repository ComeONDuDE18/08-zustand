
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;


  const tagParam = slug?.[0] === "All" ? undefined : slug?.[0];


  const page = 1;
  const search = "";

  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tagParam],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        tag: tagParam,
      }),
  });


  const initialData =
    queryClient.getQueryData<FetchNotesResponse>(["notes", page, search, tagParam])!;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} tag={tagParam ?? "All"} />
    </HydrationBoundary>
  );
}
