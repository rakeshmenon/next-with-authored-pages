import dynamic from 'next/dynamic';

export default {
  hello1: dynamic(import(/* webpackChunkName: "hello1" */ './hello1')),
  hello2: dynamic(import(/* webpackChunkName: "hello2" */ './hello2')),
  hello3: dynamic(import(/* webpackChunkName: "hello3" */ './hello3')),
  hello4: dynamic(import(/* webpackChunkName: "hello4" */ './hello4')),
  hello5: dynamic(import(/* webpackChunkName: "hello5" */ './hello5')),
  hello6: dynamic(import(/* webpackChunkName: "hello6" */ './hello6')),
  hello7: dynamic(import(/* webpackChunkName: "hello7" */ './hello7'))
};
