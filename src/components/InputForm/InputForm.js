import { useEffect, useState} from 'react'
import Input from "../UI/Input"
import Card from '../UI/Card'
import styles from './InputForm.module.css'
const InputForm = props => {
    const [userInput, setUserInput] = useState('')
    const [wasClicked, setWasClicked] = useState(0)
    const options = [<option key={-1}>Все</option>, 
    ...props.categ.map(item => <option key={item.id}>{item.name}</option>)]

    useEffect(()=> {
        const id = setTimeout(()=>{
            props.searchFromInput(userInput)
        }, 500)
        return () => {
            clearTimeout(id)
        }
    }, [userInput])
    const onChangeHandler = (event) => {
        setUserInput(event.target.value)
    }
    const sortAsc = () =>{
        setWasClicked(1);
        props.sortAsc();
    }
    const sortDes = () => {
        setWasClicked(2);
        props.sortDes()
        
    }
    const removeSort = () => {
        setWasClicked(0);
        props.removeSort()
    }
    const onChangeHandlerSelect = event => {
        const catIndex = props.categ.findIndex(item => item.name === event.target.value)
        if (props.categ[catIndex]) 
            props.changeCateg(props.categ[catIndex])
        else 
            props.changeCateg({id: -1, name: ''})
    }
    return <>
        <div className={styles.search} >
            <div className={styles.filters}>
                <Card className={styles.filter}>
                    <label>Сортировать по: </label>
                    <button onClick={sortAsc} className={wasClicked ===1 ? styles.active : ''}>
                        &#8595;
                    </button> 
                    <button onClick={sortDes} className={wasClicked ===2 ? styles.active : ''}>
                        &#8593;
                    </button>
                    <button onClick={removeSort}className={styles.removeSort}>x</button>
                </Card>
                <Card className={styles.filter}>
                    <label>Категория: </label>
                    <select defaultValue={0} onChange={onChangeHandlerSelect} className={styles.select}>{options}</select>
                </Card>
            </div>
            <input value={userInput} 
                onChange={onChangeHandler} 
                type='search' 
                placeholder='Book1'
            />
        </div>
        
    </>
}
export default InputForm
