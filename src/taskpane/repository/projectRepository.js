import NewRepository from "./newrepository";
import Repository from "./repository";
const getProjects = "/projects?limit=255";
export default {
  getProjects() {
    // return Repository.get(`${getProjects}`);
    return NewRepository.get(`/all-projects`);
  },
};
