import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import { deleteRentCollection, fetchRentCollectionList, searchRentCollection } from "../../../redux/Actions/RentCollectionAction";

const t_head = [
  { name: "Property Name" },
  { name: "Project Name" },
  { name: "Renter Name" },
  { name: "Rent amount" },
  { name: "Created at" },
  { name: "Status" },
  { name: "Actions" },
];


const formsData = [
  {
    fieldName: "Due amount",
    fieldType: "number",
    fieldPlaceholder: "Due amount",
  },
  // {
  //   fieldName: "Amount",
  //   fieldType: "number",
  //   fieldPlaceholder: "Amount",
  // },
];

const RentCollectionList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.rentCollectionReducer);

  console.log(state)
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    property_id: item.property_name,
    project_id: item.project_name,
    renter_id: item.renter_name,
    rent_amount: item.rent_amount,
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
    dispatch(fetchRentCollectionList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchRentCollectionList(newPage));
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
        dispatch(deleteRentCollection(id));
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
  const app_model = "renter/RentCollection/";
  const serializer_class = "FRentCollection";
  const searchData = { formData, app_model, serializer_class };
  if (allKeysEmpty) {
    // If the search field is empty, fetch all formData
    dispatch(fetchRentCollectionList(current_page));
  } else {
    dispatch(searchRentCollection(searchData));
  }
};

  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Rent Collection"}
        redirectLink={"/rent-collections/rent-collections-crete"}
        model_name={"rentCollection"}
        app_label={"renter"}
        url_endpoint={"/export-csv/?model=rentCollection&app_label=renter"}
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
        editLink={"/rent-collections/edit-rent-collections"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default RentCollectionList;
