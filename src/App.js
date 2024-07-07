import conf from "./config/conf";

function App() {
  console.log(process.env.REACT_APP_APPWRITE_URL);
  console.log(conf.appwriteProjectId);
  return <h1>Hello there.</h1>;
}

export default App;
