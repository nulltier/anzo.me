---

id: '0001'
path: 'ts-choose-type-at-runtime'
title: 'Distinguish types at runtime'
tags:
    - typescript
    - runtime
short: |
    Often, using the typescript, you have to handle situations when you don't know the type beforehand, during the compile type.

---

Often, using the typescript, you have to handle situations when you don't know the type beforehand, during the compile type. It hardly could be taken as a big problem and there are usually two or three types to choose from. But anyway, due the frequency of the situation, it is totally ok to looking for robust and concise solution.

Lets look on a case with an REST endpoint that may return an error instead of a data.

The simplest solution is to make all the properties of the data we expect optional. But it won't prevent you from calling expected data from the error object.

```typescript
interface Response {
    price?: number;
    errorText?: string;
}

let empty: Response = {}; // OK?
let allTogether: Response = {
  price: 100,
  errorText: 'Price is not available'
}; // No?
```

We has to do better then that. And there are the discriminated unions to describe the set of possible types.

```typescript
interface TileInfo {
    price: string;
}

interface TileError {
    errorText: string;
}

type TileData = TileInfo | TileError;
```

Such a construct later may be used together with the `in` operator as a type guard.

```typescript
if ('price' in data) {
    showPrice(data);
} else {
    showError(data);
}
```

This will work exactly as expected. The only "flaw" of the approach is that you have to use a string literal as name of a property. It doesn't work with the variables or enums.

Because of this, a typecasting is another method to prompt a type.

```typescript
(renderingData as ResponseSuccess).accessData.forEach(doSomething);
```

With no other attempts to use the value of uncertain type typecasting will do the job. Otherwise typescript will ask you to cast a type every each attempt to access a value.

```typescript
//this won't work
if (data as TileInfo) {
    showPrice(data.price);
}

// you have to cast type each time to make it valid
if (data as TileInfo) {
    showPrice(data as TileInfo).price;
}
```

Both variants are ok when used appropriately to a situation.

## Links

-   Discriminated unions [http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions](http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions)
-   Type guarding with the `in` operator [http://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator](http://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator)
-   Type guards and type assertions [http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions)

The combination of these two approaches may help to work safely with the inputs that may provide different types.
