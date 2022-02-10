import { Injectable } from '@nestjs/common';

type Key = number;

interface Item {
  id: Key;
  value: any;
}

interface Container<T> {
  map: <R>(fn: (value: T | null) => R) => Container<R>;
  flat: <R>(fn: (value: T | null) => R) => R | null;
  get value(): T | null;
}

class SingleContainer<T> implements Container<T> {
  constructor(private item: T) {}

  map<R>(fn: (value: T | null) => R): SingleContainer<R> {
    const value = fn(this.value);
    return new SingleContainer<R>(value);
  }

  flat<R>(fn: (value: T | null) => R | null): R {
    return fn(this.value);
  }

  get value(): T | null {
    return this.item;
  }
}

@Injectable()
export class AppService {
  readonly itemSet: Map<Key, Item> = new Map();

  constructor(items: Item[] = []) {
    this.itemSet.set(1, {
      id: 1,
      value: 'foo',
    });

    items.forEach((item) => this.itemSet.set(item.id, item));
  }

  findOne(id: number): SingleContainer<Item> {
    const data = this.itemSet.get(id);
    return new SingleContainer<Item>(data);
  }
}
