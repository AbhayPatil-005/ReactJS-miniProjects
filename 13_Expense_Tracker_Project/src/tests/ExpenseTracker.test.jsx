import ExpenseTracker from "../components/dashboard/ExpenseTracker";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithStore } from "./testUtils/renderWithStore";
import { waitFor } from "@testing-library/react";
import {deleteExpense} from'../store/expensesSlice';

// mocking fetch globally
beforeEach(() => {
  global.fetch = vi.fn(); 
});

// cleaning up between tests
afterEach(() => {
  vi.restoreAllMocks(); 
});


test("shows login promp when user is not loggedin",()=>{
  renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken:"", isLoggedIn:false},
      expenses:{expenses:[]},
      theme:{mode:"light"},
    }
  });
  expect(screen.getByText(/please login/i)).toBeInTheDocument();
});

test("Shows Activate Premium Button when total expenses > 10000",()=>{
  renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken:"abc", isLoggedIn:true},
      expenses:{
        expenses:[
          {id: 1, amount: 7000, description: "test", category: "Food"},
          {id:2,  amount:4000, description: "test2", category: "Food"}
        ]
      },
      theme: {mode:"light"}
    }
  });

  expect(screen.getByText(/activate premium/i)).toBeInTheDocument();
})

test("Clicking activate premium button shows download csv button",()=>{
  const {store} = renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken: "abc", isLoggedIn: true, isPremium: false},
      expenses:{
        expenses:[
          {id:1, amount:7000},
          {id:2, amount:4000},
        ],
      },
      theme: {mode:"light"},
    },
  });
  const btn = screen.getByText(/activate premium/i);
  fireEvent.click(btn);

  expect(store.getState().auth.isPremium).toBe(true);
})

test("form inputs updates correctly",()=>{
  renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken:"abc", isLoggedIn: true},
      expenses:{expenses:[]},
      theme:{mode:"light"},  
    },
  });

  fireEvent.change(screen.getByLabelText(/amount/i),{target:{value:"200"}});
  fireEvent.change(screen.getByLabelText(/description/i),{target:{value:"tea"}});

  expect(screen.getByLabelText(/amount/i).value).toBe("200");
  expect(screen.getByLabelText(/description/i).value).toBe("tea")
});

test("renders the expenses list",()=>{
  renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken:"abc", isLoggedIn:true},
      expenses:{expenses:[{id:"1", amount:200, description:"test3", category:"others"}]},
      theme:{mode:"light"}
    },
  });

  expect(screen.getByText(/test3/i)).toBeInTheDocument();
})

test("edit loads values into form",()=>{
  renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken:"abc", isLoggedIn:true},
      expenses:{expenses:[
        {id:"1", amount:2000, description:"coffee",category:"food"}
      ]},
      theme:{mode:'light'},
    }
  });

  fireEvent.click(screen.getByText(/edit/i));

  expect(screen.getByDisplayValue("2000")).toBeInTheDocument();
  expect(screen.getByDisplayValue("coffee")).toBeInTheDocument();
});

test("fetches and displays expenses on mount", async ()=>{
  global.fetch.mockResolvedValueOnce({
    ok:true,
    json: async()=>({
      id1: {amount:200, description:"snacks", category:"Food"},
      id2:{amount:500, description:"Fuel", category:"Petrol"},
    }),
  });

  renderWithStore(<ExpenseTracker/>, {
    preloadedState:{
      auth:{bearerToken:"abc", userId:"user123", isLoggedIn:true},
      expenses:{expenses:[]},
    },
  });

  expect(await screen.findByText(/snacks/i)).toBeInTheDocument();
  expect(await screen.findByText(/Fuel/i)).toBeInTheDocument();
});

test("deletes an expense from the list", async()=>{
  global.fetch.mockResolvedValueOnce({ok:true});

  const {store} = renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken: "abc", userId: "user123", isLoggedIn: true },
      expenses: { expenses: [{ id: "1", amount: 100, description: "Tea", category: "Food" }] },
      theme:{mode:"light"},
    }
  });

  fireEvent.click(screen.getByText(/delete/i));
  store.dispatch(deleteExpense("1"));

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/expenses\/user123\/1\.json/),
    expect.objectContaining({ method: "DELETE" })
  );
});

test("updates an existing expense", async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

  renderWithStore(<ExpenseTracker />, {
    preloadedState: {
      auth: { bearerToken: "abc", userId: "user123", isLoggedIn: true },
      expenses: { expenses: [{ id: "1", amount: 200, description: "Old", category: "Food" }] },
      theme:{mode:"light"},
    },
  });

  fireEvent.click(screen.getByText(/edit/i));
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Updated" } });
  fireEvent.click(screen.getByText(/update expense/i));

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/expenses\/user123\/1\.json/),
    expect.objectContaining({ method: "PUT" })
  );
});
