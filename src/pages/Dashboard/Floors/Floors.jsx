import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import { useDispatch, useSelector } from "react-redux";

const floors = [
  {
    info: {
      name: "pending",
      height: 10,
      width: 20,
    },
    status: "pending",
  },
  {
    info: {
      name: "sold",
      height: 10,
      width: 20,
    },
    status: "sold",
  },
  {
    info: {
      name: "pending",
      height: 10,
      width: 20,
    },
    status: "pending",
  },
  {
    info: {
      name: "sold",
      height: 10,
      width: 20,
    },
    status: "sold",
  },
  {
    info: {
      name: "construction",
      height: 10,
      width: 20,
    },
    status: "construction",
  },
];

const formsData = [
  // {
  //   fieldName: "Expenser Name",
  //   fieldType: "text",
  //   fieldPlaceholder: "Expenser Name",
  // },
  // {
  //   fieldName: "Amount",
  //   fieldType: "number",
  //   fieldPlaceholder: "Amount",
  // },
];

function Floors() {
//   const dispatch = useDispatch();

//    // Filter Code
//  const handleSearch = (formData) => {
//   const allKeysEmpty = Object.values(formData).every(
//     (value) => value === "" || value === null
//   );
//   const app_model = "accounts/Expense/";
//   const serializer_class = "Expense";
//   const searchData = { formData, app_model, serializer_class };
//   if (allKeysEmpty) {
//     // If the search field is empty, fetch all formData
//     dispatch(fetchLoanBeneList(current_page));
//   } else {
//     dispatch(searchExpenses(searchData));
//   }
// };
  return (
    <>
      <TableHeader
        title={"Floors"}
        redirectLink={"/floors/floors-crete"}
        // For Export & Import
        model_name={"Work progress"}
        app_label={"hrm"}
        url_endpoint={"/export-csv/?model=Work progress&app_label=hrm"}
        // For filters
        // onSearch={handleSearch}
        formsData={formsData}

      />
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 mt-5 rounded-lg md:p-4">
        <div className="w-full mx-auto p-4 grid grid-cols-4 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200">
          {floors.map((dt, index) => {
            const floorId = index + 1;
            return (
              <Link
                key={dt}
                to={`/floors/${floorId}`}
                state={dt}
                className={`${
                  dt.status === "pending"
                    ? "bg-blue-400"
                    : dt.status === "sold"
                    ? "bg-green-600"
                    : dt.status === "construction"
                    ? "bg-red-400"
                    : ""
                }
            p-3 rounded-sm h-28 mb-4 flex justify-center items-center capitalize shadow-xl border-2 border-gray-300`}
              >
                {dt.info.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Floors;
