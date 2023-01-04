export type Response<T> = {
  data: ReadonlyArray<T>;
  page: number;
  pageSize: number;
  totalElements: number;
};

export type FilterRequestParams = {
  page?: number;
  pageSize?: number;
  filter?: string | number | Date;
};

// Task

export type TaskResponse = {
  id: number;
  description: string;
  duration: number;
  isActive: boolean | string;
};

export type GetTaskResponseBody = TaskResponse | Response<TaskResponse>;

export type PostTaskRequestBody = {
  description: string;
  duration: number;
  isActive: boolean;
};

// Bot

export type TaskBotResponse = {
  id: number;
  description: string;
  duration: number;
  isActive: boolean | string;
  completedAt?: string;
};

export type BotResponse = {
  id: number;
  name: string;
  createdAt: string;
  tasks: ReadonlyArray<TaskBotResponse>;
};

export type GetBotResponseBody = BotResponse | Response<BotResponse>;

export type PostBotRequestBody = {
  name: string;
};