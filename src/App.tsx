import Collection from "./pages/Collection"
import Dashboard from "./pages/Dashboard"
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Setting from "./pages/Setting"
import Login from "./pages/Login"
import Header from "./components/Header"
import Home from "./pages/Home"
import { Toaster } from "@/components/ui/toaster"
import { Provider } from 'react-redux'
import store from "./reducer"
import ProtectedRoute from "./components/ProtectedRoute"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist"

export default () => {
   return (

      <Provider store={store}>
         <PersistGate loading={<h1>Loading...</h1>} persistor={persistStore(store)}>
            <ThemeProvider>
               <BrowserRouter>
                  <Routes>
                     {/* <Route path="/" element={<Home/>} /> */}
                     <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/dashboard/:id" element={<Dashboard />} />
                     <Route path="/setting/:id" element={<Setting />} />
                     <Route path="/collection/:id" element={<Collection />} />
                  </Routes>
               </BrowserRouter>
               <Toaster />
            </ThemeProvider>
         </PersistGate>
      </Provider>

   )
}