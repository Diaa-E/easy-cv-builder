import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Contact from "../Contact";
import sampleInfo from "../../data/sampleInfo";

describe("Contact component", () => {

    it("Has a phone number field with value from props", () => {

        render(<Contact contact={sampleInfo.contact} setContact={() => {}}/>);
        const phoneNumber = screen.queryByLabelText(/^phone/i);

        expect(phoneNumber).toBeInTheDocument();
        expect(phoneNumber.value).toBe(sampleInfo.contact.phoneNumber);
    });

    it("Has an email field with value from props", () => {

        render(<Contact contact={sampleInfo.contact} setContact={() => {}}/>);
        const email = screen.queryByLabelText(/^email/i);

        expect(email).toBeInTheDocument();
        expect(email.value).toBe(sampleInfo.contact.email);
    });

    it("Updates phone number state when phone number value changes", () => {
        
        const setContact = vi.fn();
        render(<Contact contact={sampleInfo.contact} setContact={setContact}/>);
        const phoneNumber = screen.queryByLabelText(/^phone/i);
        fireEvent.change(phoneNumber, {target: {value: "000"}});

        expect(setContact).toHaveBeenCalledOnce();
        expect(setContact).toHaveBeenCalledWith({...sampleInfo.contact, phoneNumber: "000"});
    });

    it("Updates email state when email value changes", () => {
        
        const setContact = vi.fn();
        render(<Contact contact={sampleInfo.contact} setContact={setContact}/>);
        const email = screen.queryByLabelText(/^email/i);
        fireEvent.change(email, {target: {value: "000"}});

        expect(setContact).toHaveBeenCalledOnce();
        expect(setContact).toHaveBeenCalledWith({...sampleInfo.contact, email: "000"});
    });

    it("Clears phone number state when clear button is clicked", () => {

        const setContact = vi.fn();
        render(<Contact contact={sampleInfo.contact} setContact={setContact}/>);
        const clearPhone = screen.queryByRole("button", {name: /clear\sphone/i});
        fireEvent.click(clearPhone);

        expect(setContact).toHaveBeenCalledOnce();
        expect(setContact).toHaveBeenCalledWith({...sampleInfo.contact, phoneNumber: ""});
    });

    it("Clears email state when clear button is clicked", () => {

        const setContact = vi.fn();
        render(<Contact contact={sampleInfo.contact} setContact={setContact}/>);
        const clearEmail = screen.queryByRole("button", {name: /clear\semail/i});
        fireEvent.click(clearEmail);

        expect(setContact).toHaveBeenCalledOnce();
        expect(setContact).toHaveBeenCalledWith({...sampleInfo.contact, email: ""});
    });
});