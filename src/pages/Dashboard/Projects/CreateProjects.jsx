import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { createProjects } from "../../../redux/Actions/ProjectsAction";
import MultiStepForm from "../../../Components/shared/Forms/MultiStepForm";
import Loader from "../../../Components/shared/Loader/Loader";
import { fetchType } from "../../../redux/Actions/TypesModuleAction";

function CreateProjects() {
  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.projectsReducer);
  const navigate = useNavigate();
  const typesState = useSelector((state) => state.typesReducers?.data);

  // console.log(projectState, "projectState");

  useEffect(() => {
    dispatch(fetchType("Project Type"));
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Name",
      fieldType: "text",
      fieldPlaceholder: "project Name",
      isRequired: true,
    },
    {
      fieldName: "Address",
      fieldType: "text",
      fieldPlaceholder: "Type address here",
      isRequired: true,
    },
    {
      fieldName: "Area",
      fieldType: "text",
      fieldPlaceholder: "Project area",
      isRequired: true,
    },
    {
      fieldName: "Division",
      fieldType: "text",
      fieldPlaceholder: "Project division",
      isRequired: true,
    },
    {
      fieldName: "City",
      fieldType: "text",
      fieldPlaceholder: "Type city name here",
      isRequired: true,
    },
    {
      fieldName: "City Corporation",
      fieldType: "text",
      fieldPlaceholder: "City corporation name",
      isRequired: true,
    },
    {
      fieldName: "Ward No",
      fieldType: "text",
      fieldPlaceholder: "Word no here",
      isRequired: true,
    },
    {
      fieldName: "Post Office",
      fieldType: "text",
      fieldPlaceholder: "Post Office here",
      isRequired: true,
    },
    {
      fieldName: "Police station",
      fieldType: "text",
      fieldPlaceholder: "Police station here",
      isRequired: true,
    },
    {
      fieldName: "Zip Code",
      fieldType: "text",
      fieldPlaceholder: "Zip Code here",
      isRequired: true,
    },
    {
      fieldName: "Project size",
      fieldType: "number",
      fieldPlaceholder: "Project size here",
      isRequired: true,
    },
    {
      fieldName: "Basement no",
      fieldType: "number",
      fieldPlaceholder: "Basement no here",
      isRequired: true,
    },
    {
      fieldName: "Number of elevator",
      fieldType: "number",
      fieldPlaceholder: "Number of elevator here",
      isRequired: true,
    },
    {
      fieldName: "Number of stairs",
      fieldType: "number",
      fieldPlaceholder: "Number of stairs here",
      isRequired: true,
    },
    {
      fieldName: "Number of parking",
      fieldType: "number",
      fieldPlaceholder: "Number of parking here",
      isRequired: true,
    },
    {
      fieldName: "Number of shops",
      fieldType: "number",
      fieldPlaceholder: "Number of shops here",
      isRequired: true,
    },
    {
      fieldName: "Work start date",
      fieldType: "date",
      fieldPlaceholder: "Work start date",
      isRequired: true,
    },
    {
      fieldName: "Expected handover date",
      fieldType: "date",
      fieldPlaceholder: "Expected handover date",
      isRequired: true,
    },
    {
      fieldName: "Commarcial floor",
      fieldType: "number",
      fieldPlaceholder: "Number of commercial floor",
      isRequired: true,
      maxValue: 21,
      minValue: 0,
    },
    {
      fieldName: "Commarcial unit",
      fieldType: "number",
      fieldPlaceholder: "Number of commercial units",
      isRequired: true,
    },
    {
      fieldName: "Residential floor",
      fieldType: "number",
      fieldPlaceholder: "Number of Residential floor",
      isRequired: true,
    },
    {
      fieldName: "Residential unit",
      fieldType: "number",
      fieldPlaceholder: "Number of Residential floor",
      isRequired: true,
    },
    // {
    //   fieldName: "Project size type",
    //   fieldType: "number",
    //   fieldPlaceholder: "Project size type",
    //   isRequired: false,
    // },

    {
      fieldName: "Project type",
      fieldType: "select",
      fieldPlaceholder: "Select a role",
      isRequired: true,
      multiSelect: true,
      options: typesState?.map((type) => ({
        value: type?.id,
        label: type?.name,
      })),
    },
  ];

  const submitFunction = (data) => {
    dispatch(createProjects(data));
  };

  useEffect(() => {
    if (projectState.isCreated) {
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

    if (projectState.isError) {
      toast.error(projectState.data[0], {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [
    projectState.isError,
    projectState.data,
    projectState.isCreated,
    navigate,
  ]);

  
  if (projectState?.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <Loader text={"Creating data..."} />
      </div>
    );
  }



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
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default CreateProjects;
