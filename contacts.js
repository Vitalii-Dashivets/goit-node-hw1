import fs from "fs/promises";
import { nanoid } from "nanoid";

import path from "path";

const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);
async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

async function getContactById(contactId) {
  let contacts = await listContacts();
  const oneContact = contacts.find((cont) => cont.id === contactId);
  return oneContact || null;
}

async function removeContact(contactId) {
  let contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id: id, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
