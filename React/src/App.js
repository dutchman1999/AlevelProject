import Mylogin from "./user/login";
import AdminApp from "./admin/adminapp";
import UserApp from "./user/userApp";

function App() {
  let login = false;

  if (localStorage.getItem('sellerid') == null) {
    return (
      <UserApp/>

   );
  } else {
    return (
      <AdminApp/>

   );
  }


}

export default App;
