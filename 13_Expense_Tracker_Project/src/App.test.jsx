import { render, screen } from "@testing-library/react";
import NavBar from "./components/dashboard/NavBar";
import { Provider } from "react-redux";
import store from './store/store';
import { MemoryRouter } from "react-router-dom";

test("Testing the App", ()=>{
    render(
    <Provider store={store}>
        <MemoryRouter>
            <NavBar/>
        </MemoryRouter>         
    </Provider>)
    const homeLink = screen.getByText(/home/i)
    expect(homeLink).toBeInTheDocument()
})