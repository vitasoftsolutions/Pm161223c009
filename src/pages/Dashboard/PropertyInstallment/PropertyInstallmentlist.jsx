import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
import {
  deleteLoanBeneficiary,
  fetchLoanBeneList,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/PropertyInstallmentAction";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";

const t_head = [
  { name: "Property Name" },
  { name: "Project" },
  { name: "Date" },

  { name: "Installment Date" },
  { name: "Amount" },
  { name: "Purchase ID" },
  { name: "Status" },
  { name: "Action" },
];

const formsData = [
  {
    fieldName: "Amount",
    fieldType: "number",
    fieldPlaceholder: "Amount",
  },
];

const PropertyInstallmentlist = () => {
  const [name, setName] = useState("");

  console.log("name: ", name);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.propertySliceReducers);

  // allDataList
  const allDataList = state.data;
  console.log(state.data);
  const newData = state?.data?.map((item) => ({
    id: item.id,
    first_name: item.property_code,
    project: item.project_name,
    date: item.created_at,
    installment_date: item.installment_date,
    amount: item.amount,

    purchase_id: item.purchase_id,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  console.log(tableData);
  //
  const current_page = state.currentPage;
  const total_page = state.totalPages;

  // Pages
  let page_number = [];
  for (let i = current_page - 1; i <= current_page + 1; i++) {
    if (i < 1) continue;
    if (i > total_page) break;
    page_number.push(i);
  }

  useEffect(() => {
    dispatch(fetchLoanBeneList(current_page));
  }, [dispatch, current_page, state.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanBeneList(newPage));
  };

  const deleteFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLoanBeneficiary(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "projects/PropertyInstallment/";
    const serializer_class = "PropertyInstallment";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanBeneList(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };

  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Property Installment"}
        redirectLink={"/property-installment/create"}
        // For Export & Import
        model_name={"propertyInstallment"}
        app_label={"projects"}
        url_endpoint={
          "/export-csv/?model=propertyInstallment&app_label=projects"
        }
        // For filters
        onSearch={handleSearch}
        formsData={formsData}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/property-installment/edit"}
        erp_modalCol={12}
        photoSection={false}
      />
    </div>
  );
};

export default PropertyInstallmentlist;
