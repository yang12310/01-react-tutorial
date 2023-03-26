import React from 'react'

const Footer = ({length}) => {
// function Footer(){ 는 위와 같음

    const today = new Date();
  return (
    <footer>
        <p>{length} List {length === 1  ? "item" : "items"}</p>
    </footer>
  );
}

export default Footer;