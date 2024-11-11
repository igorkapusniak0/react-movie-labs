const bcrypt = require("bcrypt");

module.exports = (db) => {
  const users = db.collection("users");

  async function registerUser(username, email, password) {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      throw new Error("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ username, email, password: hashedPassword });
    return result.insertedId;
  }

  async function loginUser(email, password) {
    const user = await users.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      console.log("user return",user)
      return user;
    } else {
      return false;
    }
  }

  async function setMoviePlaylist(email, playlist) {
    const result = await users.updateOne({ email },{ $set: {moviePlaylist: playlist}});
    console.log(result)
    if(result){
      return true;
    }else{
      return false;
    }
  }
  async function setShowPlaylist(email, playlist) {
    const result = await users.updateOne({ email }, { $set: { showPlaylist: playlist } });
    console.log(result)
    if(result){
      return true;
    }else{
      return false;
    }
    
  }
  async function getShowPlaylist(email) {
    const result = await users.findOne({ "email": email });
    return result.showPlaylist;
  }
  async function getMoviePlaylist(email) {
    const result = await users.findOne({ "email": email });
    console.log(result)
    return result.moviePlaylist;
  }


  return { registerUser, loginUser, setMoviePlaylist, setShowPlaylist, getMoviePlaylist, getShowPlaylist };
};
