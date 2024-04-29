import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PersonalInformation from "../PersonalInformation";
import sampleInfo from "../../data/sampleInfo";

describe("Personal Information component", () => {

    it("Has a full name field with value from props", () => {

        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={() => {}}/>);
        const nameField = screen.queryByLabelText(/full\sname/i, {selector: "input"});

        expect(nameField.value).toBe(sampleInfo.personalInfo.fullName);
    });

    it("Has a profession field with value from props", () => {

        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={() => {}}/>);
        const professionField = screen.queryByLabelText(/profession/i, {selector: "input"});

        expect(professionField.value).toBe(sampleInfo.personalInfo.profession);
    });

    it("Has an address field with value from props", () => {

        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={() => {}}/>);
        const addressField = screen.queryByLabelText(/address/i, {selector: "input"});

        expect(addressField.value).toBe(sampleInfo.personalInfo.address);
    });

    it("Has a zipcode field with value from props", () => {

        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={() => {}}/>);
        const zipcodeField = screen.queryByLabelText(/zipcode/i, {selector: "input"});

        expect(zipcodeField.value).toBe(sampleInfo.personalInfo.zip)
    });

    it("Updates full name state when full name value is changed (capitalizes start of each word)", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const fullNameField = screen.queryByLabelText(/full\sname/i, {selector: "input"});
        fireEvent.change(fullNameField, {target: { value: "New Name"}});

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, fullName: "New Name"});
    });

    it("Updates profession state when profession value is changed", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const professionField = screen.queryByLabelText(/profession/i, {selector: "input"});
        fireEvent.change(professionField, {target: { value: "new profession"}});

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, profession: "new profession"});
    });

    it("Updates address state when address value is changed", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const addressField = screen.queryByLabelText(/address/i, {selector: "input"});
        fireEvent.change(addressField, {target: { value: "new address"}});

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, address: "new address"});
    });

    it("Updates zipcode state when zipcode value is changed", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const addressField = screen.queryByLabelText(/zipcode/i, {selector: "input"});
        fireEvent.change(addressField, {target: { value: "new zip"}});

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, zip: "new zip"});
    });

    it("Clears full name state when clear field button is clicked", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const clearNameButton = screen.queryByRole("button", {name: /clear.*?name/i});
        fireEvent.click(clearNameButton);

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, fullName: ""});
    });

    it("Clears profession state when clear field button is clicked", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const clearProfession = screen.queryByRole("button", {name: /clear.*?profession/i});
        fireEvent.click(clearProfession);

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, profession: ""});
    });

    it("Clears address state when clear field button is clicked", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const clearAddressButton = screen.queryByRole("button", {name: /clear.*?address/i});
        fireEvent.click(clearAddressButton);

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, address: ""});
    });

    it("Clears zipcode state when clear field button is clicked", () => {

        const setPersonalInfo = vi.fn();
        render(<PersonalInformation personalInfo={sampleInfo.personalInfo} setPersonalInfo={setPersonalInfo}/>);
        const clearZipButton = screen.queryByRole("button", {name: /clear.*?zip/i});
        fireEvent.click(clearZipButton);

        expect(setPersonalInfo).toHaveBeenCalledWith({...sampleInfo.personalInfo, zip: ""});
    });
});