import Card from "../UI/Card"
import { useRef, useState } from 'react'
import styles from './BookItem.module.css'
import Input from "../UI/Input"
const BookItem = props => {
    const amountInputRef = useRef()
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        props.onAddBook(enteredAmountNumber, props.index)
    }
    return <Card className={styles.items}>
    <div className={styles.item1}>
        <div className={styles.img}>
            <img src={props.coverUrl}/>
        </div>
        <div className={styles.bookNameCont}>
            <h3 className={styles.nameOfBook}>{props.name}</h3>
        </div>
        <p className={styles.authorName}>{props.author}</p>
        
    </div>
    <div className={styles.item2}>
        {/* <p className={styles.price}>{props.price}P</p> */}
        <form onSubmit={onSubmitHandler} className={styles.controls}>
            <div className={styles.bookNumber}>
            <span  className={styles.price}>{`${props.price}Р`}</span> <span>&nbsp;&#10006;&nbsp;</span>
            <Input   
                ref={amountInputRef}
                input={{
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '3',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            </div>
            <button className={styles.add}>В корзину</button>
        </form>
    
    </div>
    </Card>
}
export default BookItem