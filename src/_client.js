import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "apollo-boost";

const httpLink = new HttpLink({
  uri: "https://test-323.herokuapp.com/v1/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImdpdGh1Ynw4NTY3OTA4In0sIm5pY2tuYW1lIjoic3dldGhhdWR1cGEiLCJuYW1lIjoiIiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODU2NzkwOD92PTQiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0wOFQxMjoyNzowNS41NTNaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDg1Njc5MDgiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NDIxMTIyNSwiZXhwIjoxNTk0MjQ3MjI1LCJhdF9oYXNoIjoiZ1hZNzZIU0JaaHl1ZFJuSXVwSXhFdyIsIm5vbmNlIjoiNHlhb21oTFRPdU5pbmxQZk1jTHZnd0lEblo1N1p3fkUifQ.MM7ZyTloHKeuRF-GqbLs5DXDWLzqNcQU3XMKrI-fRNop3fr-G4ZeFmcJAdNTN88kHiOqtS0AKwPFZZ6HDYBjcvoi68nvQvBzsEzJ-uQG4ctPDzi6z2a-A5f99OBKS5fOhT_p7e5JX79iZqwR20FK6OU52mq0x81Wg1Pfvg2R6rfwNXbmpj6jU-x1pFPnMGsMfKcr78e-h4xk7lPLqXJiymVvitDHfPib5E8kfXxE6F7g5uen_TRrEqWANF0o22PO7jUO3dBb3k0cU5etawpLiQmDJF413cV3XMxyy5WyWFP37Ig5oGEPVUkgJSf9MD2x4f2ThjRsiYgf8lLAwMNoNQ";

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});
