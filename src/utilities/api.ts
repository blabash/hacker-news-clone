const api: string = 'https://hacker-news.firebaseio.com/v0';
const json: string = '.json?print=pretty';

export interface Item {
  id: number;
  deleted?: boolean;
  type?: string;
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number | number[];
}

export interface IUser {
  id: string;
  delay?: number;
  created: number;
  karma: number;
  about: string;
  submitted: number[];
}

function removeDead(posts: Item[]): Item[] {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts: Item[]): Item[] {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyPosts(posts: Item[]): Item[] {
  return posts.filter(({ type }) => type === 'story');
}

function onlyComments(posts: Item[]): Item[] {
  return posts.filter(({ type }) => type === 'comment');
}

export async function fetchComments(ids: number[]) {
  const comments = await Promise.all(ids.map(fetchItem));
  return removeDeleted(onlyComments(removeDead(comments)));
}

export async function fetchItem(id: number): Promise<Item> {
  const res = await fetch(`${api}/item/${id}${json}`);
  return await res.json();
}

export async function fetchPosts(ids: number[]): Promise<Item[]> {
  const posts = await Promise.all(ids.map(fetchItem));
  return removeDeleted(onlyPosts(removeDead(posts)));
}

export async function fetchUser(id: string): Promise<IUser> {
  const user = await fetch(`${api}/user/${id}${json}`);
  return await user.json();
}

export async function fetchMainPosts(type: string): Promise<Item[]> {
  const res = await fetch(`${api}/${type}stories${json}`);
  const ids = await res.json();

  if (ids.error)
    throw new Error(`There was an error fetching the ${type} posts.`);

  const posts = await Promise.all<Item>(ids.slice(0, 50).map(fetchItem));
  return removeDeleted(onlyPosts(removeDead(posts)));
}
