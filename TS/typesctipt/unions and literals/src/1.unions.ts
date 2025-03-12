// type Equal<A, B> = A extends B ? (B extends A ? true : false) : false;
// type Expect<T extends true> = T;

// function getUsername(username: string | null): string {
//     return username !== null ? `User: ${username}` : 'Guest';
// }

// // Testing return types
// const result = getUsername('Alice');
// const result2 = getUsername(null);

// // Type assertions
// type test1 = Expect<Equal<typeof result, string>>;   
// type test2 = Expect<Equal<typeof result2, string>>;  
