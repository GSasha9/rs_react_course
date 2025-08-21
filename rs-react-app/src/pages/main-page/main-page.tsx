import './main-page.scss';

import Tile from '@/components/forms/tile/tile';

const MainPage = () => {
  return (
    <main className="main">
      <section className="section">
        <Tile />
        <button type="button">Uncontrolled form</button>
      </section>
      <section className="section">
        <Tile />
        <button type="button">Hook form</button>
      </section>
    </main>
  );
};

export default MainPage;
