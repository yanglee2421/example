import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import * as schemas from "@/db/schema";

export const fetchChats = () =>
  infiniteQueryOptions({
    queryKey: ["chatTable", "infinite"],
    queryFn({ pageParam }) {
      return db.query.chatTable.findMany({
        ...pageParam,
      });
    },

    initialPageParam: {
      offset: 0,
      limit: 20,
    },

    getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
      void { allPages, allPageParams };

      if (lastPage.length < lastPageParam.limit) return null;

      return {
        ...lastPageParam,
        offset: lastPageParam.offset + 1,
      };
    },
    networkMode: "offlineFirst",
  });

export const fetchChat = (id: number) =>
  queryOptions({
    queryKey: ["chatTable", id],
    queryFn() {
      return db.query.chatTable.findFirst({
        where: eq(schemas.chatTable.id, id),
        with: {
          messages: true,
        },
      });
    },
    networkMode: "offlineFirst",
  });

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn() {
      return db.insert(schemas.chatTable).values({ name: "new chat" });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: fetchChats().queryKey,
      });
    },
    networkMode: "offlineFirst",
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      await db.transaction(async (trx) => {
        await trx.delete(schemas.chatTable).where(eq(schemas.chatTable.id, id));
        await trx
          .delete(schemas.messageTable)
          .where(eq(schemas.messageTable.chatId, id));
      });
      return {};
    },
    async onSuccess(data, vari) {
      void data;
      await queryClient.invalidateQueries({
        queryKey: fetchChats().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: fetchChat(vari).queryKey,
      });
    },
    networkMode: "offlineFirst",
  });
};

type CreateMessageData = { chatId: number; content: string; role: string };

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<NonNullable<unknown>, Error, CreateMessageData>({
    async mutationFn({ chatId, content, role }) {
      await db.transaction(async (trx) => {
        await trx
          .insert(schemas.messageTable)
          .values({ chatId, role, content });
        await trx
          .update(schemas.chatTable)
          .set({ name: content })
          .where(eq(schemas.chatTable.id, chatId));
      });
      return {};
    },
    async onSuccess(data, vari) {
      void data;
      await queryClient.invalidateQueries({
        queryKey: fetchChat(vari.chatId).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: fetchChats().queryKey,
      });
    },
    networkMode: "offlineFirst",
  });
};
