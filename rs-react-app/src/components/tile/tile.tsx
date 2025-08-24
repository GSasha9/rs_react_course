import { useEffect, useState } from 'react';

import './tile.scss';

export interface TileProps {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  acceptTC: string;
  country: string;
  file: string;
}

const Tile = ({
  name,
  age,
  email,
  password,
  gender,
  acceptTC,
  country,
  file,
}: TileProps) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (!name) return;

    setHighlight(true);

    const timer = setTimeout(() => setHighlight(false), 5000);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <div className={highlight ? 'tile highlight' : 'tile'}>
      <ul className="tile-list">
        <li>Your name: {name}</li>
        <li>Your age: {age}</li>
        <li>Your email: {email}</li>
        <li>Your password: {password}</li>
        <li>Gender: {gender}</li>
        <li>Accept T&C: {acceptTC}</li>
        <li>Country: {country}</li>
      </ul>
      <img className="tile-image" src={file} alt="user-image"></img>
    </div>
  );
};

export default Tile;
