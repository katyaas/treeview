export default {
  cache: [
  ],
  db: [
    {
      id: 1,
      value: 'root 1',
    },
    {
      id: 2,
      value: 'root 2',
    },
    {
      id: 3,
      parent: 1,
      value: 'parent 1.1'
    },
    {
      id: 4,
      parent: 1,
      value: 'parent 1.2'
    },
    {
      id: 5,
      parent: 1,
      value: 'parent 1.3'
    },
    {
      id: 6,
      parent: 2,
      value: 'parent 2.1'
    },
    {
      id: 7,
      parent: 6,
      value: 'parent 2.1.1'
    },
  ]
}