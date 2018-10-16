import dynamic from 'next/dynamic';

export default {
  hello1Container: dynamic(
    import(/* webpackChunkName: "hello1container" */ '../containers/Hello1Container')
  )
};
