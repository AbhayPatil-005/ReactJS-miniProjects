import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../store/expensesSlice";
import { ExportCSV } from "../components/utilityFolder/csvUtility";

function setup(preloadedExpenses) {
  const store = configureStore({
    reducer: { expenses: expensesReducer },
    preloadedState: { expenses: { expenses: preloadedExpenses } },
  });

  render(
    <Provider store={store}>
      <ExportCSV />
    </Provider>
  );
}

describe("ExportCSV Utility", () => {
  test("does not render when the expenses are empty", ()=>{
    //arrange
    setup([]);
    //act

    //assert
    const button = screen.queryByText(/download csv/i);
    expect(button).toBeNull();
  })

  test("renders table and buttons when expenses exist", ()=>{
    setup([{id: "1", amount: 200, description: "Tea", category: "Food"},])

    expect(screen.getByText(/tea/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name:/download csv/i})).toBeInTheDocument();
  })
  
  test("download button triggers csv generation",()=>{
    const createURLMock = vi.fn(() => "blob:mock");
    global.URL.createObjectURL = createURLMock;
    
    const createRevokeMock = vi.fn(() => "blob:mock");
    global.URL.revokeObjectURL = createRevokeMock;

    setup([
      {id: "1", amount: 200, description: "Tea", category: "Food"},
    ]);

    const btn = screen.getByRole('button',{name:/download csv/i});
    fireEvent.click(btn);

    expect(createURLMock).toHaveBeenCalled();
    expect(createRevokeMock).toHaveBeenCalled();
  })

  test("renders correct table headers", ()=>{
    setup([{id: "1", amount: 100, description: "Coffee", category: "Food"},]);

    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
  });
  
});
