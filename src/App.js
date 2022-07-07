import { React, useState, useReducer, useEffect } from 'react'
import './App.css';
import Header from './components/Header/Header';
import BooksList from './components/BooksComponents/BooksList';
import Cart from './components/Cart/Cart';
import InputForm from './components/InputForm/InputForm';

const categories = [
  {id: 1, name: "Фантастика"},
  {id: 2, name:"Психология"},
  {id: 3, name:"Техническая"},
  {id: 4, name:"Детектив"},
  {id: 5, name:"Фентези"}
]

const DEFAULT_BOOKS_DATA = [{
    name:"Властелин колец",
    authorName:"Дж. Р. Р. Толкин",
    price:799,
    coverUrl:"https://upload.wikimedia.org/wikipedia/ru/thumb/8/82/%D0%91%D1%80%D0%B0%D1%82%D1%81%D1%82%D0%B2%D0%BE_%D0%9A%D0%BE%D0%BB%D1%8C%D1%86%D0%B0.gif/253px-%D0%91%D1%80%D0%B0%D1%82%D1%81%D1%82%D0%B2%D0%BE_%D0%9A%D0%BE%D0%BB%D1%8C%D1%86%D0%B0.gif",
    categoryId:5
  },
  {
    name:"Гарри Поттер (1-7)",
    authorName:"Дж. К. Роулинг",
    price: 2990,
    coverUrl:"https://koe-shop.ru/wp-content/uploads/2020/04/REZ_5216.jpg",
    categoryId: 5
  },
  {
    name:"Искусство любить",
    authorName:"Эрих Фромм",
    price: 350,
    coverUrl:"https://img3.labirint.ru/rc/f5fdf325897ec0e84989f5b6ff5e589b/363x561q80/books44/438883/cover.jpg?1613060708",
    categoryId: 2
  },
  {
    name:"Неночь",
    authorName:"Джей Кристофф",
    price: 750,
    coverUrl:"https://u.livelib.ru/reader/Irutka05/o/rgqahu95/o-o.jpeg",
    categoryId:1
  },
  {
    name:"Отзывчивый веб-дизайн",
    authorName:"Итан Маркотт",
    price: 350,
    coverUrl:"https://img4.labirint.ru/rc/fd3ba96ae309743bbdb176ac4363a15e/363x561q80/books34/335576/cover.jpg?1563681387",
    categoryId: 3
  },
  {
    name:"Клара и Солнце",
    authorName:"Кадзуо Исигуро",
    price: 550,
    coverUrl:"https://img1.labirint.ru/rcimg/404d8efe684e66e17d04edc175dee3be/960x540/books80/796957/ph_001.jpg?1626431364",
    categoryId: 1
  },
  {
    name:"12 правил жизни",
    authorName:"Джордан Питерсон",
    price:990,
    coverUrl:"https://s1.livelib.ru/boocover/1002948923/o/2a7c/Dzhordan_Bernt_Piterson__12_pravil_zhizni_protivoyadie_ot_haosa.jpeg",
    categoryId: 2
  },
  {
    name:"Рассветная бухта",
    authorName:"Тана Френч",
    price: 689,
    coverUrl:"https://s1.livelib.ru/boocover/1000934703/o/868c/Tana_French__Rassvetnaya_buhta.jpeg",
    categoryId: 4
  },
  {
    name:"Иметь или быть",
    authorName:"Эрих Фромм",
    price: 400,
    coverUrl:"https://img3.labirint.ru/rc/21d8cec041c9789de87490cc134a65bd/363x561q80/books54/538225/cover.jpg?1612697270",
    categoryId:2
  },
  {
    name:"Не заставляйте меня думать",
    authorName:"Стив Круг",
    price: 1500,
    coverUrl:"https://cv3.litres.ru/pub/c/pdf-kniga/cover_max1500/24147734-stiv-krug-ne-zastavlyayte-menya-dumat-veb-uzabiliti-i-zdravyy-smy-24147734.jpg",
    categoryId: 3
  },
]
const defaultCartState = {
  items: [],
  totalAmount: 0
}

const reducerFunc = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + 
      action.data.item.price * action.data.count;
    let updatedItems;
    const existingItemIndex = state.items.findIndex(item => 
      item.name === action.data.item.name &&
      item.authorName === action.data.item.authorName)
    const existingItem = state.items[existingItemIndex]
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        count: existingItem.count + action.data.count 
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      const newItem = {...action.data.item, count: action.data.count}
      updatedItems = state.items.concat(newItem)
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if (action.type === 'ADD_FROM_CART') {

    let updatedItems;
    const existingItem = state.items[action.index]
    const updatedItem = {
       ...existingItem,
       count: existingItem.count + 1
    }
    updatedItems = [...state.items]
    updatedItems[action.index] = updatedItem

    const updatedTotalAmount = state.totalAmount + 
      existingItem.price;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if(action.type === 'REMOVE_FROM_CART') {
    let updatedItems;
    const existingItem = state.items[action.index]
    let updatedTotalAmount = state.totalAmount - 
        existingItem.price;

    if (existingItem.count === 1) {
      updatedItems = state.items.filter(item => 
        item.name !== existingItem.name &&
        item.authorName !== existingItem.authorName)
    } else {
      const updatedItem = {
        ...existingItem,
        count: existingItem.count -1
      }
      updatedItems = [...state.items]
      updatedItems[action.index] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if (action.type === 'REMOVE_HARD') {
    const existingItem = state.items[action.index]
    let updatedTotalAmount = state.totalAmount - 
        existingItem.price * existingItem.count;
    const updatedItems = state.items.filter(item => 
          item.name !== existingItem.name &&
          item.authorName !== existingItem.authorName)
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if (action.type === 'LOCAL_STORAGE') {
    return {
      items: action.cartState.items,
      totalAmount: action.cartState.totalAmount
    }
  }
  return defaultCartState;
}

function App() {
  const [categ, setCateg] = useState(categories)
  const [cartState, dispatchCartAction] = useReducer(reducerFunc, defaultCartState);
  const [books, setBooks] = useState(DEFAULT_BOOKS_DATA)
  const [filterParam, setFilterParam] = useState({})
  const [balance, setBalans] = useState(20000)
  // useEffect(() => {
  //   async function fetchData () {
  //     try {
  //       let response = await fetch('http://45.8.249.57/bookstore-api/books', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             filters: {
  //               ...filterParam
  //             }
  //         })
  //       });
  //       let res = await response.json();
  //       setBooks(() => {
  //         return [...res]
  //       })
  //     }
  //     catch (err) {
  //       //console.log(err)
  //     }
  //   }
  //   fetchData();
  // },[filterParam])

  useEffect(() => {
    // async function fetchData () {
    //   try {
    //     let response = await fetch('http://45.8.249.57/bookstore-api/books/categories');
    //     let res = await response.json();
    //     setCateg([...res])
    //   }
    //   catch (err) {
    //     //console.log(err)
    //   }
    // }
    // fetchData();
    
    const cartStateLS = JSON.parse(localStorage.getItem("cartState"));
    if (cartStateLS) {
      dispatchCartAction({type: "LOCAL_STORAGE", cartState: cartStateLS})
    }
    const balancaLS = JSON.parse(localStorage.getItem('balance'))
    if (balancaLS) {
      setBalans(balancaLS)
    }
  }, [])
  const onAddBookHandler = (count, index) => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
    dispatchCartAction({type: 'ADD', data: {count: count, item: books[index]}})
  }

  const removeBookFromCart = (index) => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
    dispatchCartAction({type: 'REMOVE_FROM_CART', index: index})
  }

  const addBookFromCart = (index) => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
    dispatchCartAction({type: 'ADD_FROM_CART', index: index})
  }
  const onRemoveAllItemHandler = (index) => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
    dispatchCartAction({type: 'REMOVE_HARD', index: index})
  }
  const filterBooksByUserInput = (userInput, usingDefaultBooks = true) => {
    if (usingDefaultBooks)
    setBooks(prev => {
      let newBooks = DEFAULT_BOOKS_DATA.filter(el=> el.name.toLowerCase().includes(userInput.toLowerCase()) 
      || el.authorName.toLowerCase().includes(userInput.toLowerCase()))
      return [...newBooks]
    })
    else {
      setBooks(prev => {
        let newBooks = prev.filter(el=> el.name.toLowerCase().includes(userInput.toLowerCase()) 
      || el.authorName.toLowerCase().includes(userInput.toLowerCase()))
      return [...newBooks]
      })
    }
  }
  const onSearchFromInput = userInput => {
    setFilterParam((prev)=>{
      return {
        ...prev,
        search: userInput
      }
    })
    setBooks(DEFAULT_BOOKS_DATA);
    if (filterParam.categoryId) {
      filterBooksByCategory(filterParam.categoryId)
    } 
    if (userInput.trim().length>0) 
      filterBooksByUserInput(userInput, false)
    
    if (filterParam.sortPrice) {
      if (filterParam.sortPrice === 'ASC')
        onSortAsc()
      else 
        onSortDes()
    }
  }
  const onSortAsc = () => {
    if (filterParam.sortPrice !== 'ASC')
    setFilterParam((prev)=>{
      return {
        ...prev,
        sortPrice: 'ASC'
      }
    })
    setBooks(prev => {
      return prev.sort((a,b) => a.price - b.price)
    })
  }
  const onSortDes = () => {
    if (filterParam.sortPrice !== 'DESC')
    setFilterParam((prev)=>{
      return {
        ...prev,
        sortPrice: 'DESC'
      }
    })
    setBooks(prev => {
      return prev.sort((a,b) => a.price - b.price).reverse()
    })
  }
  const onRemoveSort = () => {
    setFilterParam((prev)=>{
      delete prev.sortPrice;
      return {
        ...prev
      }
    })
  }

  const filterBooksByCategory = (id) => {
    setBooks(prev => {
      let newBooks
      if (id !== -1) {
        newBooks = DEFAULT_BOOKS_DATA.filter(el => 
          el.categoryId === id
        );
      }
      else {
        newBooks = [...DEFAULT_BOOKS_DATA]
      } 
      return newBooks
    })
    
  }
  const ChangeCategHandler = item => {
    setFilterParam((prev)=>{
      if (item.id !== -1) 
        return {
          ...prev,
          categoryId: item.id
        }
      else  {
        delete prev.categoryId
        return {
          ...prev
        }
      }
    })
    
    filterBooksByCategory(item.id)
    if (filterParam.sortPrice) {
      if (filterParam.sortPrice === 'ASC')
        onSortAsc()
      else 
        onSortDes()
    }
    if (filterParam.search.trim().length > 0) {
      filterBooksByUserInput(filterParam.search, false)
    }
  }

  const onBuyBooks = amount => {
    localStorage.setItem('balance', JSON.stringify(balance - amount));
    dispatchCartAction({type: 'EMPTY_CART'})
    setBalans(prev => prev - amount)
    
  }
  return (
    <div className="App">
      <Header balance={balance}/>
      <InputForm searchFromInput={onSearchFromInput} 
        sortAsc={onSortAsc} 
        sortDes={onSortDes}
        removeSort={onRemoveSort}
        categ={categ}
        changeCateg={ChangeCategHandler}
      />
      <section className="content">
        <div className="box1">
          <BooksList books={books} onAddBook={onAddBookHandler}/>
        </div>
        <div className='box2'>
          <Cart cartInfo={cartState} 
            onAdd={addBookFromCart} 
            onRemove={removeBookFromCart}
            onRemoveAllItem={onRemoveAllItemHandler}
            buyBooks={onBuyBooks}
            balance={balance}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
