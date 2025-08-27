import './home.scss';

import Row from '@/components/row/row';
import { DATA_ENTRIES } from '@/shared/constants/data-entries';

const HomePage = () => {
  return (
    <div className="table">
      <div className="table_head">
        <span className="table_head-item">Country</span>
        <span className="table_head-item">Year</span>
        <span className="table_head-item">Population</span>
        <span className="table_head-item">Cement_co2</span>
        <span className="table_head-item">Cement_co2_per_capita</span>
      </div>
      {DATA_ENTRIES.map((_, index) => {
        return <Row data={DATA_ENTRIES} index={index} key={index} />;
      })}
    </div>
  );
};

export default HomePage;
