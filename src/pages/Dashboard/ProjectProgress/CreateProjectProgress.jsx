import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createProjectProgress } from "../../../redux/Actions/ProjectProgressAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchWorkProgressAllList } from "../../../redux/Actions/WorkProgressAction";


function CreateProjectProgress() {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.projectProgressReducer);
  const projectsState = useSelector((state) => state.projectsReducer.data);
  const wpState = useSelector((state) => state.workprogressReducers.data);
  const navigate = useNavigate();

  console.log(wpState, "wpState")

  const submitFunction = (data) => {
    dispatch(createProjectProgress(data));
  };

  useEffect(() => {
    dispatch(fetchProjectsAllList());
    dispatch(fetchWorkProgressAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Note",
      fieldType: "text",
      fieldPlaceholder: "Note",
      isRequired: true,
      hasWidth:3,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: true,
      hasWidth:3,
      options: projectsState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
    {
      fieldName: "Wp ids",
      fieldType: "select",
      fieldPlaceholder: "Wp ids",
      isRequired: true,
      hasWidth:3,
      options: wpState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
  ];

  useEffect(() => {
    if (propertyState.isCreated) {
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
        navigate("/project-progress");
      }, 3000);
    }

    if (propertyState.isError) {
      toast.error(propertyState.data[0], {
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
  }, [propertyState.isError, propertyState.data, propertyState.isCreated, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/project-progress"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
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

export default CreateProjectProgress;
