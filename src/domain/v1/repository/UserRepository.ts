import Repository from "./Repository";

class UserRepository extends Repository {
  private collection = "users";

  async findByEmail(email: string) {
    return await mongo.database.collection(this.collection).findOne({ email });
  }

  async create(name: string, email: string, password: string) {
    return await mongo.database
      .collection(this.collection)
      .insertOne({ name, email, password });
  }
}

export default new UserRepository();

/*

/var/logs/mng-api/prod

folder: (2022-03-01)
info.log
error.log
debug.log
request.log 

/mng-log/sdfsdf
{
  api_key:"sfjs;dfs",
  sdfsdf
  sdf
  sdf
}
result {

}


user 10 collected 5 points
user 3 added venue 90 to card





lg(`{red}this is red{reset}`)
lg(`this is normal`)
*/
