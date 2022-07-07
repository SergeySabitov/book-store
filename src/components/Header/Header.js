import { React, useState } from 'react'
import styles from './Header.module.css'
import background from '../../assets/back.jpg'
const Header = (props) => {
    return <> 
        <header className={styles.header}>
            <h2>Магазин книг</h2>
            <div className={styles.money}>
                <h2>Баланс</h2>
                <div>{props.balance}Р</div>
            </div>
        </header>
        <div className={styles.img}>
            <img src={background} alt="old awesome books"/>
        </div>
    </>
}
export default Header