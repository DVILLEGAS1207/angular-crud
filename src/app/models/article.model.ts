export interface Article {
  id: number;
  title?: string;
  description?: string;
  body?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  authorId?: number;
}
