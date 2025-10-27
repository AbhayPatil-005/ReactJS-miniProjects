import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "../components/auth/ForgotPassword";

describe("ForgotPassword Component",()=>{
    test("renders form elements correctly", ()=>{
        render(
            <MemoryRouter>
                <ForgotPassword/>
            </MemoryRouter>
        );

        expect(screen.getByRole("heading",{name:/reset your password/i})).toBeInTheDocument();
        expect(screen.getByLabelText(/enter your email address/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /send reset link/i})).toBeInTheDocument();
    });

    test("shows default button text before sending", ()=>{
        render(
            <MemoryRouter>
                <ForgotPassword/>
            </MemoryRouter>
        );

    const button  = screen.getByRole("button", {name: /send reset link/i});
    expect(button).toHaveTextContent("Send Reset Link");
        expect(button).not.toBeDisabled();
    });

    test("updates email input value on user typing", ()=>{
        render(
            <MemoryRouter>
                <ForgotPassword/>
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/enter your email address/i);;
        fireEvent.change(emailInput, {target:{value:"test@example.com"}});

        expect(emailInput.value).toBe("test@example.com");
    });
});