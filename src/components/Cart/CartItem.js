import React from "react"
import styles from './CartItem.module.css'
const CartItem = props => {
    const onAddHandler = () => {
        props.onAdd(props.index)
    }
    const onRemoveHandler = () => {
        props.onRemove(props.index)
    }
    const onRemoveAllItem = () => {
        props.onRemoveAllItem(props.index)
    }
    return <div className={styles.item}>
        <div className={styles.block1}>
            <div>
                <span className={styles.title}>{props.name}</span>
            </div>
            <div className={styles.inf}>
                <span className={styles.price}>{props.price}P</span>
                <div className={styles.cnt}>
                    <button onClick={onRemoveHandler}>-</button>
                    <span className={styles.count}>x {props.count}</span>
                    <button onClick={onAddHandler}>+</button>
                </div>
            </div>
        </div>
        <div className={styles.block2}>
                <button onClick={onRemoveAllItem}>x</button>
        </div>
    </div>
}
export default CartItem