import Repository from "./repository";
const getContacts = "/contacts?limit=255";
const createContact = "/contact/new";
const searchContacts = "/contacts?search";
export default {
  getContacts() {
    return Repository.get(`${getContacts}`);
  },
  createContact(payload) {
    return Repository.post(`${createContact}`, payload);
  },
  searchContact(payload) {
    return Repository.get(`${searchContacts}=${payload}`);
  },
};
