//?? 1) Stale Time property and refetching API data :-

//?? Stale time :-
// --> It tells how much time the fetched data is fresh
// --> After that the data becomes stale
// --> Its default value is 0
// --> If we specify "Infinity" (without quotes) data will always remain fresh


//?? Only After stale time expires :-
// --> React Query can refetch
// --> React Query doesn't refetch immediately
// --> When a refetch trigger event happens like :-
// a) component re-mount
// b) window tab switch back
// c) Network reconnect

// --> React Query re-fetches from API (not from cache)
// --> Replaces stale cache with fresh data


//?? NOTE :-
// --> If the data is still fresh
// --> React Query will not refetch even on the above triggers


//***************************** */


//?? To avoid refetch from API when stale time is over:-
// To avoid this, we can set the three properties as false
refetchOnMount: false
refetchOnWindowFocus: false
refetchOnReconnect: false

// --> Now React Query will not refetch from API, even after Stale time is over


//***************************** */


//?? To refetch even when the data is fresh on above triggers :-
// --> By default React Query can only refetch when Stale time is over
// --> To make refetch also happen on fresh data on the above triggers

refetchOnMount: "always"
refetchOnWindowFocus: "always"
refetchOnReconnect: "always"
