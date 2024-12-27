import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Write from "./pages/Write.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./components/Layout.jsx";

function App() {
    return (
        <div className="app">
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />} >
                            <Route path="/" element={<Home />} />
                            <Route path="/write" element={<Write />} />
                            <Route path="/post/:id" element={<Post />} />
                        </Route>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App
