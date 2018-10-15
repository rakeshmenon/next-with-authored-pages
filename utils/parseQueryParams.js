export default pathname => {
  const search = pathname.split('?')[1];
  if (search) {
    const queryList = search.split('&');
    return queryList.reduce((accu, curr) => {
      const [key, value] = curr.split('=');
      return { ...accu, [key]: value.split('#')[0] };
    }, {});
  }
  return {};
};
