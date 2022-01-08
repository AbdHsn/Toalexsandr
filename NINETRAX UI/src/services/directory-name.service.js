import http from "../http-common";

class DirectoryNameService {
  getAll() {
    return http.get("/settings/DirectoryNames");
  }

  //   get(id) {
  //     return http.get(`/tutorials/${id}`);
  //   }

  create(data) {
    return http.post("/settings/DirectoryNames", data);
  }

  //   update(id, data) {
  //     return http.put(`/tutorials/${id}`, data);
  //   }

  //   delete(id) {
  //     return http.delete(`/tutorials/${id}`);
  //   }

  //   deleteAll() {
  //     return http.delete(`/tutorials`);
  //   }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new DirectoryNameService();
