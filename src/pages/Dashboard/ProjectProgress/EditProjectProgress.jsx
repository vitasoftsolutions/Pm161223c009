import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchProjectProgress,
  updateProjectProgress,
} from "../../../redux/Actions/ProjectProgressAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchWorkProgressAllList } from "../../../redux/Actions/WorkProgressAction";

function EditProjectProgress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.projectProgressReducer);
  const projectsState = useSelector((state) => state.projectsReducer.data);
  const wpState = useSelector((state) => state.workprogressReducers.data);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchProjectProgress(location.state));
  }, [location.state, dispatch]);

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
      hasWidth: 3,
      defaultValue: state.note,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: true,

      options: projectsState?.map((dt, index) =>
        // console.log("vl", state.project_id === dt.id ? index : null),
        ({
          is_select: state.project_id === dt.id ? "selected" : "",
          index: state.project_id === dt.id ? index : null,
          value: dt.id,
          label: `${dt?.name === null ? dt.username : dt?.name}`,
        })
      ),
      defaultValue: state.project_id
        ? projectsState?.findIndex((dt) => dt.id === state.project_id)
        : null,
      hasWidth: 3,
    },
    {
      fieldName: "Wp ids",
      fieldType: "select",
      fieldPlaceholder: "Wp ids",
      isRequired: true,
      multiSelect: true,
      options: wpState?.map((dt, index) => {
        const isSelected =
          state.wp_ids && state.wp_ids.includes(dt.id);
        console.log(dt, "isSelected");
        return {
          is_select: isSelected ? "selected" : "",
          index: isSelected ? index : null,
          value: dt.id,
          label: `${dt?.name}`,
        };
      }),
      defaultValue: state.wp_ids
        ? wpState?.findIndex((dt) => state.wp_ids?.includes(dt?.id))
        : null,
      hasWidth: 3,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        note: data.note ? data.note : state.note,
        project_id: data.project_id ? data.project_id : state.project_id,
        wp_ids: data.wp_ids ? data.wp_ids : state.wp_ids,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateProjectProgress({
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
        navigate("/project-progress");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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

export default EditProjectProgress;
