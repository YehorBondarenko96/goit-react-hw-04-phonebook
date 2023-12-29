import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import css from './Styles.module.css';
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export const App = () => {

  const contactsLS = localStorage.getItem('contacts');
  const valueContacts = contactsLS ? JSON.parse(contactsLS) : [];
  
  const [contacts, setContacts] = useState(valueContacts);
  const [filter, setFilter] = useState('');

  const updateStateForAdd = (evt) => {
    evt.preventDefault();
    const newName = evt.currentTarget.elements.name.value;
    const newNumb = evt.currentTarget.elements.number.value;
    const contactsInState = contacts;
    if(!contactsInState.some(contact => contact.name.toLowerCase() === newName.toLowerCase())){
      setContacts((prevContacts) => [...prevContacts, {id: nanoid(), name: newName, number: newNumb}])
    } else{
      alert(`${newName} is already in contacts.`)
    }
    evt.currentTarget.reset();
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

  const updateStateForDelete = (evt) => {
    const idContact = evt.currentTarget.id;
    const newContactsForState = contacts.filter((contact) => (contact.id !== idContact));
    setContacts([...newContactsForState])
  };

  const updateStateForFilter = (evt) => {
    evt.preventDefault();
    const filterValue = evt.target.value;
    setFilter(filterValue);
  };

  const workFilters = () => {
      if(filter.length > 0) {
       return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()))
      } else {
        return contacts
      }
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        fontSize: 20,
        color: '#010101',
        margin: 20
      }}
    >
      <div>
  <h1 className={css.phonebook}>Phonebook</h1>
  <ContactForm 
  updateStateForAdd={updateStateForAdd}
  />

  <h2 className={css.contacts}>Contacts</h2>
  <Filter
  filterWithState={filter}
  updateStateForFilter={updateStateForFilter}
  />
  <ContactList 
  contacts={workFilters()}
  updateStateForDelete={updateStateForDelete}
  />
</div>
    </div>
  )
};