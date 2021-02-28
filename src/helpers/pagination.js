const pagination = (size, page) => {
  const limit = size ? +size : 5;
  const offset = page > 0 ? (page - 1) * limit : 0;
  return { limit, offset };
};

export default pagination;
