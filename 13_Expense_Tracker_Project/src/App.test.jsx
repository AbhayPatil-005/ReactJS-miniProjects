import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './store/authSlice';
import themeReducer,{toggleTheme} from './store/themeSlice';
import expensesReducer from './store/expensesSlice';
import App from "./App";
import { describe } from "vitest";

//arrange
function setup(preloadedState){
    const store = configureStore({
        reducer : {
            auth: authReducer, 
            theme: themeReducer, 
            expenses: expensesReducer
        },
        preloadedState,
    })
    const utils = render(
        <Provider store={store}>
            <MemoryRouter>
                <App />
            </MemoryRouter>
        </Provider>
    );

  return { store, ...utils };
}
 
describe("App Component", ()=>{
    // Assert
test("renders LoginPage by default when user is not logged in", ()=>{
    //dummy data for test! 
    const preloadedState = {
        auth : {
            isLoggedIn: false, 
            bearerToken: "",
            userId: null },
        theme: {mode: "light"},
        expenses: {expenses:[]},
        };
    
    const {container} = setup(preloadedState);
    expect(container.firstChild).toHaveClass("light-theme");

});

test("switches theme class when redux theme state changes", async()=>{
    const preloadedState = {
        auth: { isLoggedIn: false, bearerToken: "", userId: null },
        theme: { mode: "light" },
        expenses: { expenses: [] },
    };

    const {store, container} = setup(preloadedState);

    // initial should be light-theme
    expect(container.firstChild).toHaveClass("light-theme");

    // toggle should change to dark-theme
   await waitFor(()=>{
    store.dispatch(toggleTheme());
   }) 
    expect(container.firstChild).toHaveClass("dark-theme");
});
})
