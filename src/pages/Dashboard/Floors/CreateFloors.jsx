import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";


const formsData = [
  {
    fieldName: "First Name",
    fieldType: "text",
    fieldPlaceholder: "First Name",
    isRequired: true,
  },
  {
    fieldName: "Last Name",
    fieldType: "text",
    fieldPlaceholder: "Last Name",
    isRequired: true,
  },
  {
    fieldName: "Email",
    fieldType: "email",
    fieldPlaceholder: "example@gmail.com",
    isRequired: true,
  },
  {
    fieldName: "Nid Number",
    fieldType: "number",
    fieldPlaceholder: "Nid Number",
    isRequired: true,
  },
  {
    fieldName: "Present Address",
    fieldType: "text",
    fieldPlaceholder: "Present Address (Comma Separated)",
    isRequired: true,
  },
  {
    fieldName: "Permanent Address",
    fieldType: "text",
    fieldPlaceholder: "Permanent Address (Comma Separated)",
    isRequired: true,
  },
  {
    fieldName: "Profile Picture",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: false,
  },
  {
    fieldName: "Nid Front",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: false,
  },
  {
    fieldName: "Nid Back",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: false,
  },
];

function CreateFloors() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/floors"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <BeneficiaryForm
          formsData={formsData}
          // submitFunction={submitFunction}
          isReset={true}
        />
      </div>
    </>
  );
}

export default CreateFloors;
