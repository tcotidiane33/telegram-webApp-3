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

    // États des filtres
    const [priceFilter, setPriceFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [publisherFilter, setPublisherFilter] = useState('');

    // État pour gérer l'affichage du menu déroulant
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    // Fonction de filtrage des livres
    const filterBooks = () => {
        let filteredData = getData();

        if (priceFilter) {
            filteredData = filteredData.filter((book) => book.price === priceFilter);
        }

        if (yearFilter) {
            filteredData = filteredData.filter((book) => book.YearOfPublication === yearFilter);
        }

        if (titleFilter) {
            filteredData = filteredData.filter((book) => book.BookTitle.toLowerCase().includes(titleFilter.toLowerCase()));
        }

        if (publisherFilter) {
            filteredData = filteredData.filter((book) => book.Publisher.toLowerCase().includes(publisherFilter.toLowerCase()));
        }

        setData(filteredData);
    };

    // Réinitialiser les filtres
    const resetFilters = () => {
        setPriceFilter('');
        setYearFilter('');
        setTitleFilter('');
        setPublisherFilter('');
        setData(getData());
    };

    return (
        <div className="category-container">
            <Nav />
            <h1>Base de données</h1>

            {/* Formulaire de filtre */}
            <div className="filter-form">
                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        Filter
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <label>
                                Par Prix:
                                <input type="text" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
                            </label>

                            <label>
                                Par Année de Publication:
                                <input type="text" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
                            </label>

                            <label>
                                Par Titre:
                                <input type="text" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
                            </label>

                            <label>
                                Par Éditeur:
                                <input type="text" value={publisherFilter} onChange={(e) => setPublisherFilter(e.target.value)} />
                            </label>

                            <button onClick={filterBooks}>Filtrer</button>
                            <button onClick={resetFilters}>Réinitialiser</button>
                        </div>
                    )}
                </div>
            </div>


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
