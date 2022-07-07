import  React  from 'react'
import Card from '../UI/Card'
import styles from './BooksList.module.css'
import BookItem from './BookItem'
const BooksList = props => {
    const books = props.books.map((book, index) => {
        return <BookItem 
        key={index} 
        index={index}
        name={book.name} 
        author={book.authorName}
        price={book.price}
        coverUrl={book.coverUrl}
        onAddBook={props.onAddBook}
        />
    })
    return <section className={styles['books-list']}>
        {books.length > 0 && books}
        {books.length === 0 && <Card className={styles.notFound}>Книги не найдены</Card>}
    </section>
}
export default BooksList