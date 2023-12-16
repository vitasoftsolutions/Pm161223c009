import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteFlateRent,
  fetchFlateRentList,
  searchFlateRent,
} from "../../../redux/Actions/FlateRentAction";

const t_head = [
  { name: "Property Name" },
  { name: "Project Name" },
  { name: "Renter Name" },
  { name: "Advanced Amount" },
  { name: "Created Date" },
  { name: "Status" },
  { name: "Actions" },
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

const FlateRentList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.flateRentReducer);
  console.log(state, "state");
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    property_id: item.property_name,
    project_id: item.project_name,
    renter_id: item.renter_name,
    advanced_amount: item.advanced_amount,
    date: item.created_at,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  //

  // console.log(tableData, "tableData");

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
    dispatch(fetchFlateRentList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchFlateRentList(newPage));
  };

  // console.log(state, "state_ page");

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
        dispatch(deleteFlateRent(id));
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
    const app_model = "renter/FlatRent/";
    const serializer_class = "FlatRent";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchFlateRentList(current_page));
    } else {
      dispatch(searchFlateRent(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Flatrent"}
        redirectLink={"/flat-rent/flat-rent-crete"}
        model_name={"flatRent"}
        app_label={"renter"}
        url_endpoint={"/export-csv/?model=flatRent&app_label=renter"}
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
        editLink={"/flat-rent/edit-flat-rent"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default FlateRentList;
