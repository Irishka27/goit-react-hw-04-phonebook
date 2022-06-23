import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import s from './App.module.css';

 function App () {

  const [filter, setFilter] = useState("");
  const [contacts, setContacts] =  useState(() => {
      return JSON.parse(localStorage.getItem("contacts")) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]); 
 
  const addContact = (name, number) => {
    const contactsItem = {
      id: nanoid(),
      name,
      number,
    };
   contacts.find(
      contact => contactsItem.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(`${contactsItem.name} is already in contact`)
      : setContacts(contacts => [contactsItem, ...contacts],
        );
   };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterByLetters = () => {
    const normalizedFilterValue = filter.toLocaleLowerCase().trim();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilterValue)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

     return (
      <div className={s.container}>
        <ContactForm onSubmit={addContact} />
        <h3>Contacts</h3>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={filterByLetters()}
            onDeleteContact={deleteContact} />
      </div>
    );
 
}

export default App;
