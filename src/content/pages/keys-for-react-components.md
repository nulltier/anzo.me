# Retrieve keys for a React components

React has its quirks. Keys for the components rendered in an iteration of any kind are [amongst of them](https://reactjs.org/docs/lists-and-keys.html).

```javascript jsx
{
  users.map(user => <Card key={user.some - unique - property} user={user} />);
}
```

The practice will save you many moments of sheer amusement. React can do interesting things and even nasty things with components rendered in a cycle without keys.

Usually, when each data piece has a unique property, this is a clear no-brainer.

But, sometimes, you have to use the pieces of data with no IDs to map through to render React components. Practice shows that there are different approaches to make things done.

```javascript jsx
{
  users.map(user => <Card key={calculateHashOfTheObject(user)} user={user} />);
}
```

This one looks like an overhead to me. The function has to keep all hashes for each object to avoid recalculations of them on each render. And usually, developers add an external dependency to solve the task.

Usually, I prefer to use indexes as the keys.

```javascript jsx
const Cards = users => {
  const [preparedUsers] = useState(
    users.map((user, i) => ({
      ...user,
      id: i
    }))
  );

  return preparedUsers.map(user => <Card key={user.id} user={user} />);
};
```

It works because the index set as ID only once. Any other operations with the list of the users and following re-renders won't affect id implicitly.
