import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import {
  updateLoanBeneficiary,
} from "../../../redux/Actions/loanBenAction";
import { fetchProject, updateProject } from "../../../redux/Actions/ProjectsAction";
import MultiStepForm from "../../../Components/shared/Forms/MultiStepForm";

function EditProjects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.projectsReducer);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state, "sData");

  useEffect(() => {
    dispatch(fetchProject(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Name",
      fieldType: "text",
      fieldPlaceholder: "project Name",
      isRequired: true,
      defaultValue: state.name,
    },
    {
      fieldName: "Address",
      fieldType: "text",
      fieldPlaceholder: "Type address here",
      isRequired: true,
      defaultValue: state.address,
    },
    {
      fieldName: "Area",
      fieldType: "text",
      fieldPlaceholder: "Project area",
      isRequired: true,
      defaultValue: state.area,
    },
    {
      fieldName: "Division",
      fieldType: "text",
      fieldPlaceholder: "Project division",
      isRequired: true,
      defaultValue: state.division,
    },
    {
      fieldName: "City",
      fieldType: "text",
      fieldPlaceholder: "Type city name here",
      isRequired: true,
      defaultValue: state.city,
    },
    {
      fieldName: "City Corporation",
      fieldType: "text",
      fieldPlaceholder: "City corporation name",
      isRequired: true,
      defaultValue: state.city_corporation,
    },
    {
      fieldName: "Ward No",
      fieldType: "text",
      fieldPlaceholder: "Word no here",
      isRequired: true,
      defaultValue: state.ward_no,
    },
    {
      fieldName: "Post Office",
      fieldType: "text",
      fieldPlaceholder: "Post Office here",
      isRequired: true,
      defaultValue: state.post_office,
    },
    {
      fieldName: "Police station",
      fieldType: "text",
      fieldPlaceholder: "Police station here",
      isRequired: true,
      defaultValue: state.police_station,
    },
    {
      fieldName: "Zip Code",
      fieldType: "text",
      fieldPlaceholder: "Zip Code here",
      isRequired: true,
      defaultValue: state.zip_code,
    },
    {
      fieldName: "Project size",
      fieldType: "number",
      fieldPlaceholder: "Project size here",
      isRequired: true,
      defaultValue: state.project_size,
    },
    {
      fieldName: "Basement no",
      fieldType: "number",
      fieldPlaceholder: "Basement no here",
      isRequired: true,
      defaultValue: state.basement_no,
    },
    {
      fieldName: "Number of elevator",
      fieldType: "number",
      fieldPlaceholder: "Number of elevator here",
      isRequired: true,
      defaultValue: state.number_of_elevator,
    },
    {
      fieldName: "Number of stairs",
      fieldType: "number",
      fieldPlaceholder: "Number of stairs here",
      isRequired: true,
      defaultValue: state.number_of_stairs,
    },
    {
      fieldName: "Number of parking",
      fieldType: "number",
      fieldPlaceholder: "Number of parking here",
      isRequired: true,
      defaultValue: state.number_of_parking,
    },
    {
      fieldName: "Number of shops",
      fieldType: "number",
      fieldPlaceholder: "Number of shops here",
      isRequired: true,
      defaultValue: state.number_of_shops,
    },
    {
      fieldName: "Work start date",
      fieldType: "date",
      fieldPlaceholder: "Work start date",
      isRequired: true,
      defaultValue: state.work_start_date,
    },
    {
      fieldName: "Expected handover date",
      fieldType: "date",
      fieldPlaceholder: "Expected handover date",
      isRequired: true,
      defaultValue: state.expected_handover_date,
    },
    {
      fieldName: "Commarcial floor",
      fieldType: "number",
      fieldPlaceholder: "Number of commercial floor",
      isRequired: true,
      defaultValue: state.commarcial_floor,
    },
    {
      fieldName: "Commarcial unit",
      fieldType: "number",
      fieldPlaceholder: "Number of commercial units",
      isRequired: true,
      defaultValue: state.commarcial_unit,
    },
    {
      fieldName: "Residential floor",
      fieldType: "number",
      fieldPlaceholder: "Number of Residential floor",
      isRequired: true,
      defaultValue: state.residential_floor,
    },
    {
      fieldName: "Residential unit",
      fieldType: "number",
      fieldPlaceholder: "Number of Residential floor",
      isRequired: true,
      defaultValue: state.residential_unit,
    },
    // {
    //   fieldName: "Project size type",
    //   fieldType: "number",
    //   fieldPlaceholder: "Project size type",
    //   isRequired: false,
    // defaultValue: state.project_size_type,
    // },

    // {
    //   fieldName: "Project type",
    //   fieldType: "select",
    //   fieldPlaceholder: "Select a role",
    //   isRequired: true,
    // defaultValue: state.project_type,
    //   options: typesState.map((type) => ({
    //     value: type.id,
    //     label: type.name,
    //   })),
    // },
  ];

  const submitFunction = (data) => {

    if (state) {
      const updateData = {
        name: data.name ? data.name : state.name,
        address: data.address ? data.address : state.address,
        area: data.area ? data.area : state.area,
        division: data.division ? data.division : state.division,
        city: data.city ? data.city : state.city,
        city_corporation: data.city_corporation ? data.city_corporation : state.city_corporation,
        ward_no: data.ward_no ? data.ward_no : state.ward_no,
        post_office: data.post_office ? data.post_office : state.post_office,        
        police_station: data.police_station ? data.police_station : state.police_station,
        zip_code: data.zip_code ? data.zip_code : state.zip_code,
        project_size: data.project_size ? data.project_size : state.project_size,
        basement_no: data.basement_no ? data.basement_no : state.basement_no,
        number_of_elevator: data.number_of_elevator ? data.number_of_elevator : state.number_of_elevator,
        number_of_stairs: data.number_of_stairs ? data.number_of_stairs : state.number_of_stairs,
        number_of_parking: data.number_of_parking ? data.number_of_parking : state.number_of_parking,
        number_of_shops: data.number_of_shops ? data.number_of_shops : state.number_of_shops,
        work_start_date: data.work_start_date ? data.work_start_date : state.work_start_date,
        expected_handover_date: data.expected_handover_date ? data.expected_handover_date : state.expected_handover_date,
        commarcial_floor: data.commarcial_floor ? data.commarcial_floor : state.commarcial_floor,
        commarcial_unit: data.commarcial_unit ? data.commarcial_unit : state.commarcial_unit,
        residential_floor: data.residential_floor ? data.residential_floor : state.residential_floor,
        residential_unit: data.residential_unit ? data.residential_unit : state.residential_unit,
        project_size_type: data.project_size_type ? data.project_size_type : state.project_size_type,
        project_type: data.project_type ? data.project_type : state.project_type,
        status: data.status ? data.status : state.status,
      };
      
      dispatch(
        updateProject({
          id: state.id,
          data: updateData,
        })
      );
    }
  };

  // In a useEffect or similar, check the updated state
  useEffect(() => {
    if (reduxState.isUpdate) {
      // Perform actions after the update is successful
      toast("Successfully done", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/projects"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MultiStepForm
          formsData={formsData}
          submitFunction={submitFunction}
          isReset={true}
          isState={state}
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default EditProjects;
