import Repository from "./repository";
import NewRepository from "./newrepository";
const getOpportunities = "/opportunities?limit=255";
const createOpportunity = "/opportunity/new";
export default {
  getOpportunities() {
    // return Repository.get(`${getOpportunities}`);
    return NewRepository.get(`/all-opportunities`);
  },
  createOpportunity(payload) {
    return Repository.post(`${createOpportunity}`, payload);
  },
};
