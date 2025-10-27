import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";

import authReducer from '../../store/authSlice';
import expensesReducer from '../../store/expensesSlice';
import themeReducer from '../../store/themeSlice';

export function renderWithStore(ui,{ 
    preloadedState = {},
        store = configureStore({
            reducer:{
                auth:authReducer,
                expenses:expensesReducer,
                theme:themeReducer,
            },
            preloadedState,
        })
    }={}
) {
    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter>
                    {ui}
                </MemoryRouter>
            </Provider>
        ),
        store,
    };
}
