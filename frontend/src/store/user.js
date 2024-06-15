import {atom} from "recoil"

const user = atom({
    key: 'user',
    default: {
      first_name : null,
      last_name : null,
      email : null,
      user_id : null,
      balance : null
    }
  });
export default user;