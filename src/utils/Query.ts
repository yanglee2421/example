export class Query<TData> {
  constructor(
    private readonly queryFn: () => Promise<TData>,
    private readonly onError: (error: Error) => void,
    private readonly onSuccess: () => void
  ) {}

  #status = "pending";
  public data: TData | null = null;
  public error: Error | null = null;
  async load() {
    if (this.#status !== "pending") {
      return this.query;
    }

    try {
      const data = await this.queryFn();

      this.#status = "resolve";

      this.data = data;
      this.onSuccess();
    } catch (error) {
      this.#status = "reject";

      if (error instanceof Error) {
        this.error = error;
        this.onError(error);
      }
    }
  }

  public query: QueryInstance<TData> = {
    status: "pending",
    error: null,
    data: null,
  };

  handleReject(error: Error): QueryInstanteError {
    this.query.status = "failed";
    this.error = error;
    this.data = null;

    return {
      status: this.query.status,
      error: this.error,
      data: this.data,
    };
  }

  handleResolve(data: TData): QueryInstanceSuccess<TData> {
    this.query.status = "success";
    this.error = null;
    this.data = data;

    return {
      status: this.query.status,
      error: this.error,
      data: this.data,
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
