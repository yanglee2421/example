export class Query<TData> {
  constructor(private readonly queryFn: () => Promise<TData>) {}

  async load() {
    if (this.query.status !== "pending") {
      return this.query;
    }

    try {
      const data = await this.queryFn();
      this.query = this.handleResolve(data);

      return this.query;
    } catch (error) {
      if (error instanceof Error) {
        this.query = this.handleReject(error);
      }

      return this.query;
    }
  }

  public query: QueryInstance<TData> = {
    status: "pending",
    error: null,
    data: null,
  };

  handleReject(error: Error): QueryInstanteError {
    return {
      status: "failed",
      error,
      data: null,
    };
  }

  handleResolve(data: TData): QueryInstanceSuccess<TData> {
    return {
      status: "success",
      error: null,
      data,
    };
  }
}

type QueryInstance<TData> =
  | QueryInstancePending
  | QueryInstanteError
  | QueryInstanceSuccess<TData>;

type QueryInstancePending = {
  status: "pending";
  error: null;
  data: null;
};

type QueryInstanteError = {
  status: "failed";
  error: Error;
  data: null;
};

type QueryInstanceSuccess<TData> = {
  status: "success";
  error: null;
  data: TData;
};
