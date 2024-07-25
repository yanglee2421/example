import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/db";

export function useUserTable(params: Params) {
  return useQuery({
    queryKey: ["userTable", params],
    queryFn() {
      return db.query.userTable.findMany({
        where(userTable, filters) {
          return filters.and(
            params.name
              ? filters.like(userTable.name, `%${params.name}%`)
              : void 0,
            params.email
              ? filters.like(userTable.email, `%${params.email}%`)
              : void 0,
          );
        },
      });
    },
  });
}

type Params = {
  name: string;
  email: string;
};
