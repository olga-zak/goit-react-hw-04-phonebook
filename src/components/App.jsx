import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { GlobalStyles } from './GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Header } from './App.styled';
import { SecondaryHeader } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExist) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const saveFilteredValue = event => {
    setFilter(event.target.value);
  };

  const filterContacts = () => {
    const optimizedString = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(optimizedString)
    );
  };

  const deleteContact = idToDelete => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idToDelete)
    );
  };

  return (
    <>
      <Header>Phonebook</Header>
      <ContactForm addContact={addContact} />
      <SecondaryHeader>Contacts</SecondaryHeader>
      <Filter filter={filter} findContact={saveFilteredValue} />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
      <GlobalStyles />
    </>
  );
};
