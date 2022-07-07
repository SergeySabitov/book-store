import { useState, useEffect} from 'react'
import styles from './Cart.module.css'
import Card from '../UI/Card'
import CartItem from './CartItem'
const Cart = props => {
    const [justBuy, setJustBuy] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [isEnough, setIsEnough] = useState(true)
    const onRemoveHandler = (index) => {
        props.onRemove(index);
        if (props.cartInfo.items.length === 1 && props.cartInfo.items[index].count === 1)
            setIsEmpty(true)
    }
    const onRemoveAllItem = (index) => {
        props.onRemoveAllItem(index);
        if (props.cartInfo.items.length === 1 )
            setIsEmpty(true)
    }
    const cartItems = <ul className={styles.list}> { props.cartInfo.items.map((item,index) => { 
        return <li key={Math.random()}><CartItem
            index={index}
            name={item.name}
            authorName={item.authorName}
            price={item.price}
            count={item.count}
            onAdd={props.onAdd}
            onRemove={onRemoveHandler}
            onRemoveAllItem={onRemoveAllItem}/> 
            </li>} ) 
            }
            </ul>
    useEffect(() => {
        if (props.cartInfo.items.length > 0) {
            setIsEmpty(false)
            
        } else {
            setIsEmpty(true)
        }
    }, [cartItems])

    const buyHandler = () => {
        if (props.balance < props.cartInfo.totalAmount) {
            {
                setIsEnough(false);
                setJustBuy(false)
            }
        } else if (props.cartInfo.totalAmount > 0) {
            setIsEnough(true)
            setJustBuy(true)
            props.buyBooks(props.cartInfo.totalAmount)
        } else  {
            setJustBuy(false)
            setIsEnough(true)
        }
    }
    
    return <Card className={styles.stick}>
        <h2 className={styles.title}>Корзина</h2>
        {cartItems}
        {isEmpty && <p>В корзине пока пусто</p>}
        <p className={styles.amount}>Сумма: {props.cartInfo.totalAmount}Р</p>
        <button className={styles.buyButton}onClick={buyHandler}>Купить</button>
        {justBuy && <p className={styles.enough}>Успешно!</p>}
        {!isEnough && <p className={styles.notenough}>Недостаточно средств</p>}
    </Card>
}

export default Cart