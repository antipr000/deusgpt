import DBProvider from "../mongo.client";

class UserRepository {
    constructor() {
        this.dbProvider = new DBProvider();
    }
};

export default UserRepository;