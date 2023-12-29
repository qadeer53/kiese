import Repository from "./repository";
const createAccount = "/account/new";
export default {
  createAccount(payload) {
    return Repository.post(`${createAccount}`, payload);
  },
};
