export const getParameters = (token) => {
  const get = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return get;
};
