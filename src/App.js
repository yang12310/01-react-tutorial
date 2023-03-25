import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

function App() {

  const [items, setItems] = useState([
    {
        id : 1,
        checked : true,
        item : "One half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
        id : 2,
        checked : false,
        item : "Item2"
    },
    {
        id : 3,
        checked : false,
        item : "Item3"
    }
  ]);


   //이벤트 핸들러 추가
    const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {
        ...item, // 아이템 중에
        checked: !item.checked //true면 값을 변경
    } : item //아니면 그대로 
    )
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  // delete 기능 추가
    const handleDelete = (id) => { //여기 id가 내가 클릭한 id
    const listItems = items.filter((item) => {
        //debugger;
        return item.id !== id
    });
    //!==id 를 쓴 이유가 클릭한 아이디와 같지 않은 것만 새로 랜더링 한 것 (선택한 건 빠짐)
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  return (
   <div className="App">
      <Header title="Grocery list"/>
      <Content
        items = {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer/>
   </div>
  );
}

export default App;
