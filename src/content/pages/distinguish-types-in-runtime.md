---
id: 0001
path: '/note/ts-choose-type-at-runtime'
title: 'Distinguish types at runtime'
tags:
  - typescript
  - types
---

Often, you have while using typescript you have to handle situations when you don't know the type beforehand, during the compile type, for sure. For example, you may easily get an error instead of expected data as a result of a call to a REST API.

The naive solution is to make all the properties optional. But it won't prevent you from calling expected data from the error object.

```typescript
interface Response {
  price?: string;
  errorText?: string;
}
```

There is a better way. We may use the discriminated union to describe all the possible types.

```typescript
interface TileInfo {
  price: string;
  __;
}

interface TileError {
  errorText: string;
}

type TileData = TileInfo | TileError;
```

Such a construct later may be used together with the in operator as a type guard.

```typescript jsx
{
  'price' in data && data.price;
}
```

This will work exactly as expected. The only flaw of the approach is a necessity to use a string literal with the name of a property. It stops working if someone will try to move string into variable or enum. Because of this, I see no reason to use this approach exclusively for everything. For some cases, the typecasting will work fine.

```typescript jsx
{
  (renderingData as ResponseSuccess).accessData.map(doSomething);
}
```

It works because there are no further attempts to reach data which may be not available. Next example will show it better.

```typescript jsx
//this won't work
{
  (TileInfo as data) && data.price;
}

// you have to cast type each time to make it valid
{
  (TileInfo as data) && (TileInfo as data).price;
}

// type guarding looks better this time
{
  'price' in data && data.price;
}
```

Both variants are ok when used appropriately to a situation.

## Links

- Discriminated unions [http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions](http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions)
- Type guarding with the `in` operator [http://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator](http://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator)
- Type guards and type assertions [http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions)

The combination of these two approaches may help to work safely with the inputs that may provide different types.
