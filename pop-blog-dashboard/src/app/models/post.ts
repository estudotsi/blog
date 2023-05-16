export interface Post {
  title: string,
  permalink: string,
  postImaTitle: string,
  excerpt: string,
  content: string,
  isFeature: boolean,
  views: number,
  status: string,
  createdAt: Date,
  categoryId: number
}
