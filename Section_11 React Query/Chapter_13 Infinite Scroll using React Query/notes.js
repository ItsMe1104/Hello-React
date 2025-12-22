//?? 1) What is Infinite Scroll?

// --> It is a UI/UX pattern where more data is automatically loaded & appended as the user scrolls down
// --> It is an alternate of Pagination
// --> It is mainly used for addictive websites where we want the user to keep getting engaged (e.g Instagram)


//? How it works (step by step)
// --> Initial data is loaded (e.g., first 10 items)
// --> User scrolls down
// --> App detects user is near the bottom
// --> App fetches the next set of items
// --> New items are appended, not replaced
// --> Repeat until no more data


//! React Query has a dedicated inbuilt hook to implement Infinite scroll