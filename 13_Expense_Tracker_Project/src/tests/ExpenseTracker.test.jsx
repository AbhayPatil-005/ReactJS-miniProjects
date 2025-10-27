import ExpenseTracker from "../components/dashboard/ExpenseTracker";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithStore } from "./testUtils/renderWithStore";
import { waitFor } from "@testing-library/react";

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

test("delete removes element from ui", async()=>{
  const {store} = renderWithStore(<ExpenseTracker/>,{
    preloadedState:{
      auth:{bearerToken:"abc", isLoggedIn:true},
      expenses:{expenses:[{id:"1", amount:1000, description:"test4", category:"others"}]},
      theme:{mode:"light"},
    }
  });
  expect(screen.getByText(/test4/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/delete/i));
  await waitFor(() => {
    expect(screen.queryByText(/test4/i)).not.toBeInTheDocument();

  })
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