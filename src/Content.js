import React from 'react'

const Content = () => {

    const nameChange = () =>{
        const names = ['Bob', 'Kevin', 'Dave'];
        const int = Math.floor(Math.random() * 3);
        return names[int];
    }

    const handleClick = () => {
        console.log("You Clicked it");
    }
    //이벤트 처리할때는 함수선언이 아닌 함수표현식을 써야함

    const handleClick2 = (name) => {
        console.log(`${name} was clicked`)
    }

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    }

  return (
    <main>
        <p>
            Hello {nameChange()} !
        </p>
        <button onClick={handleClick}>click</button>
        <button onClick={() => handleClick2('Dave')}>click</button>
        <button onClick={(e) => handleClick3(e)}>click me</button>
    </main>
  )
}

export default Content;