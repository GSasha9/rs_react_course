import './tile.scss';

interface TileProps {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  acceptTC: string;
}

const Tile = ({ name, age, email, password, gender, acceptTC }: TileProps) => {
  return (
    <div className="tile">
      <ul className="tile-list">
        <li>Your name: `${name}`</li>
        <li>Your age: `${age}`</li>
        <li>Your email: `${email}`</li>
        <li>Your password: `${password}`</li>
        <li>Gender: `${gender}`</li>
        <li>Accept T&C: `${acceptTC}`</li>
      </ul>
      <img alt="user-image"></img>
    </div>
  );
};

export default Tile;
