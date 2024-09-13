<template>
    <div>
        <h1>Books</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>

        <!-- Edit Book Form -->
        <div v-if="selectedBook">
            <h2>Edit Book</h2>
            <form @submit.prevent="updateBook">
                <div>
                    <label for="editIsbn">ISBN:</label>
                    <input type="text" v-model="selectedBook.isbn" id="editIsbn" required />
                </div>
                <div>
                    <label for="editName">Name:</label>
                    <input type="text" v-model="selectedBook.name" id="editName" required />
                </div>
                <button type="submit">Update Book</button>
                <button @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    orderBy,
    limit
} from 'firebase/firestore'

export default {
    setup() {
        const books = ref([])
        const selectedBook = ref(null)

        // Fetch books using where, orderBy, and limit
        const fetchBooks = async () => {
            try {
                const q = query(
                    collection(db, 'books'),
                    where('isbn', '>', 1000),
                    orderBy('isbn', 'desc'),
                    limit(10)
                )
                const querySnapshot = await getDocs(q)
                const booksArray = []
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() })
                })
                books.value = booksArray
            } catch (error) {
                console.error('Error fetching books: ', error)
            }
        }

        // Method to initiate editing a book
        const editBook = (book) => {
            selectedBook.value = { ...book }
        }

        // Method to cancel editing
        const cancelEdit = () => {
            selectedBook.value = null
        }

        // Method to update the book in Firestore
        const updateBook = async () => {
            try {
                const bookRef = doc(db, 'books', selectedBook.value.id)
                await updateDoc(bookRef, {
                    isbn: Number(selectedBook.value.isbn),
                    name: selectedBook.value.name
                })
                // Update local data
                const index = books.value.findIndex((book) => book.id === selectedBook.value.id)
                if (index !== -1) {
                    books.value[index] = { ...selectedBook.value }
                }
                selectedBook.value = null
                alert('Book updated successfully!')
            } catch (error) {
                console.error('Error updating book: ', error)
            }
        }

        // Method to delete a book from Firestore
        const deleteBook = async (id) => {
            try {
                await deleteDoc(doc(db, 'books', id))
                books.value = books.value.filter((book) => book.id !== id)
                alert('Book deleted successfully!')
            } catch (error) {
                console.error('Error deleting book: ', error)
            }
        }

        onMounted(() => {
            fetchBooks()
        })

        return {
            books,
            selectedBook,
            editBook,
            cancelEdit,
            updateBook,
            deleteBook
        }
    }
}
</script>
