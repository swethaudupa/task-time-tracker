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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImdpdGh1Ynw4NTY3OTA4In0sIm5pY2tuYW1lIjoic3dldGhhdWR1cGEiLCJuYW1lIjoiIiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODU2NzkwOD92PTQiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0wOVQxMTozOTo0OC4wNTZaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDg1Njc5MDgiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NDI5NDc4OCwiZXhwIjoxNTk0MzMwNzg4LCJhdF9oYXNoIjoidFdPeDlfRjV4NjBvc0pLLUtsTzhMUSIsIm5vbmNlIjoiRDdudnY2UVJhS2V3Y0FvLm1zelR3OTk5N1VWQWlGWTYifQ.yHsrB4WMMklHqc2o3HIG5pCLWGmHp_9OSQTn_xteUG5hDEjKiIJpZpQlnL1DQ9qPJW5nRXhUlXr3QLxNosmVFb056eu0ve5WFXN4ogdQQLaKKlgb9Cv95wYIxtU02tLzpmB1wl6rjkcduEQVJ9hH0VEqYW_tpVdx6lkR_5v49EpBFZBJBDnFZEIFOlv1qqdWOIqKn7mBZ5BUDdpRIGi0E2ilGhLKUk58Wr7WniY_clsbV6AN-0UuOXCmN1_Mv6ZKC_RzXGFFmSm8D90lETioGRo4KJ2a8zHROTvzNaB2dtJ0NIaX1uFfej8zywRUDbc28NZ0xmoIfFdmUu27TVt_cw";
  
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
