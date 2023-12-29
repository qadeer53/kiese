import accountRepository from "./accountRepository";
import contactRepository from "./contactRepository";
import opportunityRepository from "./opportunityRepository";
import projectRepository from "./projectRepository";

const repositories = {
  project: projectRepository,
  opportunity: opportunityRepository,
  contact: contactRepository,
  account: accountRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
