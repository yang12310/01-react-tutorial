import React from 'react'

const Footer = () => {
// function Footer(){ 는 위와 같음

    const today = new Date();
  return (
    <footer>
        <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
}

export default Footer;