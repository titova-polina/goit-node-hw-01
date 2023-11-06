const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error reading contacts:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((c) => c.id === contactId);
    if (!removedContact) return null;

    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );

    return removedContact;
  } catch (error) {
    console.error("Error reading/removing contacts:", error);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );

    return newContact;
  } catch (error) {
    console.error("Error reading/adding contacts:", error);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
