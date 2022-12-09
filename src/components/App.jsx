import { nanoid } from 'nanoid';
import { Component } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Header } from './App.styled';
import { SecondaryHeader } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //проверяем есть ли данные в localStorage и записываем их в state если true
  componentDidMount() {
    const localStorageData = localStorage.getItem('contacts');
    //if (localStorageData !== null)
    if (localStorageData) {
      this.setState({ contacts: JSON.parse(localStorageData) });
    }
  }

  //componentDidUpdate(prerProps, prevState)
  //отслеживаем изменение state (при добавлении или удалении контакта)
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //data - объект с именем и телефоном, которые ввели в форме
  addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    const isExist = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExist) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  saveFilteredValue = event => {
    this.setState({ filter: event.target.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const optimizedString = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(optimizedString)
    );
  };

  deleteContact = idToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };

  render() {
    return (
      <>
        <Header>Phonebook</Header>
        <ContactForm addContact={this.addContact} />
        <SecondaryHeader>Contacts</SecondaryHeader>
        <Filter
          filter={this.state.filter}
          findContact={this.saveFilteredValue}
        />
        <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
        <GlobalStyles />
      </>
    );
  }
}
