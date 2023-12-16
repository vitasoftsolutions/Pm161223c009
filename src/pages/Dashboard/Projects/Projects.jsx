import { useEffect } from "react";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import Swal from "sweetalert2";
// import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjects,
  fetchProjects,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/ProjectsAction";
import DisplayProjects from "../../../Components/Projects/DisplayProjects";

const formsData = [
  {
    fieldName: "Name",
    fieldType: "text",
    fieldPlaceholder: "Name",
  }
];

function Projects() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.projectsReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    area: item.area,
    work_start_date: item.work_start_date,
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
    dispatch(fetchProjects(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchProjects(newPage));
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
        dispatch(deleteProjects(id));
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
    const app_model = "projects/ProjectInfo/";
    const serializer_class = "Project";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchProjects(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };

  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Projects"}
        redirectLink={"/projects/crete-projects"}
        // For Export & Import
        model_name={"projectInfo"}
        app_label={"projects"}
        url_endpoint={"/export-csv/?model=projectInfo&app_label=projects"}
        // For filters
        onSearch={handleSearch}
        formsData={formsData}
      />
      <DisplayProjects
        allDataList={allDataList}
        editLink={"/projects/editprojects"}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        photoSection={false}
        erp_modalCol={12}
        tableData={tableData}
        deleteFunction={deleteFunction}
      />
    </div>
  );
}

export default Projects;
