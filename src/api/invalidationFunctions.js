export const invalidate = (client, queryKey) => {
  client.invalidateQueries({ queryKey: queryKey });
};
