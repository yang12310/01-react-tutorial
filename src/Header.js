import React from 'react'

const Header = ({title = "Default Title"}) => {
  const headerStyle = {
    backgroundColor: 'mediumblue', 
    color: '#fff'
  };
  return (
    <header style={headerStyle}>
      <h1>{title}</h1>
    </header>
  )
 }


 export default Header;
