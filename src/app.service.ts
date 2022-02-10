import { Injectable } from '@nestjs/common';

type Key = number;

interface Item {
  id: Key;
  value: any;
}

interface Container<T> {
  map: <R>(fn: (value: T) => R) => Container<R>;
  flat: <R>(fn: (value: T) => R) => R | undefined;
  get value(): T | undefined;
}

class Option<T> implements Container<T> {
  constructor(private item: T) {}

  map<R>(fn: (value: T) => R): Option<R> {
    if (!this.value) {
      return new Option<R>(undefined);
    } else {
      return new Option<R>(fn(this.value));
    }
  }

  flat<R>(fn: (value: T) => R): R | undefined {
    if (!this.value) {
      return undefined;
    } else {
      return fn(this.value);
    }
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

  findOne(id: number): Option<Item> {
    const data = this.itemSet.get(id);
    return new Option<Item>(data);
  }
}
