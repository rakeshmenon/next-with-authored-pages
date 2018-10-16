import dynamic from 'next/dynamic';

export default {
  section: dynamic(
    import(/* webpackChunkName: "section" */ '../regions/Section')
  ),
  subsection: dynamic(
    import(/* webpackChunkName: "subsection" */ '../regions/SubSection')
  )
};
