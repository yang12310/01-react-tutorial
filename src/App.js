import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems);
  //   localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  // }

  useEffect(()=>{

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data') // response가 실패하면
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err){
        setFetchError(err.message);
      } finally{
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      (async ()=> await fetchItems())(); //self invoke 함수
    },2000)

   
  }, []);


  const addItem = async (item) => { //input창에 입력한글자가 아이템
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    //기존에 아이템 수가 있으면 배열의 수를 가져와서 1을 밴 마지막 아이템의 아이디값에 +1을 해라
    const myNewItem = {id, checked:false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method : 'POST', //create
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }


   //이벤트 핸들러 추가
    const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? {
        ...item, // 아이템 중에
        checked: !item.checked //true면 값을 변경
    } : item //아니면 그대로 
    )
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({checked : myItem[0].checked})
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  // delete 기능 추가
    const handleDelete = async (id) => { //여기 id가 내가 클릭한 id
    const listItems = items.filter((item) => {
        //debugger;
        return item.id !== id
    });
    //!==id 를 쓴 이유가 클릭한 아이디와 같지 않은 것만 새로 랜더링 한 것 (선택한 건 빠짐)
    setItems(listItems);

    const deleteOptions = {method : 'DELETE'};
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem('');
  }

  return (
   <div className="App">
      <Header title="Grocery list"/>
      <AddItem 
        newItem={newItem}
        setNewItem = {setNewItem}
        handleSubmit= {handleSubmit}
      />
      <SearchItem
        search = {search}
        setSearch = {setSearch}
      />
      <main>
        {isLoading && <p>Loading Items ...</p>}
        {fetchError && <p style ={{color:"red"}}>{`Error : ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items = {items.filter(
            item => ((item.item).toLowerCase().includes(search.toLowerCase()))
          )}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
     
      <Footer length = {items.length}/>
   </div>
  );
}

export default App;
