import regions from './regions';
import containers from './containers';
import components from './components';

export default {
  regions: {
    ...regions
  },
  components: {
    // Presentational Components
    ...components,

    // Container Components
    ...containers
  }
};
