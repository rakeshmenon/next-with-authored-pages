import dynamic from 'next/dynamic';

export default {
  regions: {
    section: dynamic(
      import(/* webpackChunkName: "section" */ '../regions/Section')
    ),
    subsection: dynamic(
      import(/* webpackChunkName: "subsection" */ '../regions/SubSection')
    )
  },
  components: {
    // Presentational Components
    hello1: dynamic(
      import(/* webpackChunkName: "hello1" */ '../presentation/hello1')
    ),
    hello2: dynamic(
      import(/* webpackChunkName: "hello2" */ '../presentation/hello2')
    ),
    hello3: dynamic(
      import(/* webpackChunkName: "hello3" */ '../presentation/hello3')
    ),
    hello4: dynamic(
      import(/* webpackChunkName: "hello4" */ '../presentation/hello4')
    ),
    hello5: dynamic(
      import(/* webpackChunkName: "hello5" */ '../presentation/hello5')
    ),
    hello6: dynamic(
      import(/* webpackChunkName: "hello6" */ '../presentation/hello6')
    ),
    hello7: dynamic(
      import(/* webpackChunkName: "hello7" */ '../presentation/hello7')
    )

    // Container Components
  }
};
