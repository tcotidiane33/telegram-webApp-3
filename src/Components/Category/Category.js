import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import { getData } from '../../db/db';
import './Category.css';
import Modal from 'react-modal';


Modal.setAppElement('#root');

export default function Category() {
    const [data, setData] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Utilise la fonction getData pour obtenir les données
        const booksData = getData();
        setData(booksData);
    }, []);

    return (
        <div className="category-container">
            <Nav />
            <h1>Base de données</h1>
            <div className="books-list">
                {data.map((item) => (
                    <div key={item.ISBN} className="book-item" onClick={() => openModal(item)}>
                        <img src={item.ImageM} alt={item.BookTitle} className="book-image" />
                        <div className="book-details">
                            <h2>Title: {item.BookTitle}</h2>
                            <p>Author: {item.BookAuthor}</p>
                            <p>Year: {item.YearOfPublication}</p>
                            <p>Publisher: {item.Publisher}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Book Details"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedBook && (
                    <>
                        <h2 className="book-titleS">{selectedBook['BookTitle']}</h2>
                        <img src={selectedBook['ImageS']} alt={selectedBook['BookTitle']} className="book-imageS" />
                        <p>Author: {selectedBook['BookAuthor']}</p>
                        <p>Year: {selectedBook['YearOfPublication']}</p>
                        <p>Publisher: {selectedBook['Publisher']}</p>
                        <p>Price: {selectedBook['price']}</p>
                        <button onClick={closeModal}>Close</button>
                    </>
                )}
            </Modal>
        </div>
    );
}
