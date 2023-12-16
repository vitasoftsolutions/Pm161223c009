import { useState, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { IoLocation } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import NoData from "../../../Components/shared/NoData";
import { fetchFloors } from "../../../redux/Actions/FloorsAction";
// Tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DetailsModal from "../../../Components/shared/Modals/DetailsModal";

function ProjectsDetails() {
  const dispatch = useDispatch();
  let { state } = useLocation();

  const [allData, setAllData] = useState(null);

  console.log(state, "state");

  useEffect(() => {
    dispatch(fetchFloors(state?.id));
  }, [dispatch, state]);

  // Modal data
  const getModalData = () => {
    const foundObject = state;
    setAllData(foundObject);
  };

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
      {!state ? (
        <NoData />
      ) : (
        <div className="bg-white shadow-lg shadow-blue-200 md:mx-8 mb-5 mt-5 rounded-lg md:p-4">
          <div
            className={`w-full mx-auto p-4 bg-gray-200 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md min-h-[60vh] relative`}
          >
            <div>
              <button
                onClick={() => {
                  getModalData();
                }}
                className="text-erp_primary font-bold text-2xl"
              >
                {state?.name}
              </button>
              <div className="flex items-center gap-2">
                <p className="text-erp_danger">
                  <IoLocation />
                </p>
                <p>{state.division},</p>
                <p>{state.police_station},</p>
                <p>{state.city}</p>
              </div>
            </div>

            <div className="flex gap-8 justify-between items-start mb-5 mt-8">
              <div className="h-20 w-1/2 bg-gray-300 rounded-md p-3">
                <p className="text-xl font-semibold text-gray-800">
                  Total Earning
                </p>
                <p className="text-xl font-semibold text-gray-800 ml-1">0000</p>
              </div>
              <div className="h-20 w-1/2 bg-gray-300 rounded-md p-3">
                <p className="text-xl font-semibold text-gray-800">
                  Total Expense
                </p>
                <p className="text-xl font-semibold text-gray-800 ml-1">0000</p>
              </div>
            </div>

            <div className="">
              <p className="font-semibold text-xl border-white border-b-2 mb-2">
                Bills
              </p>
              <Tabs>
                <TabList className="">
                  <Tab>Contactor</Tab>
                  <Tab>Suppliers</Tab>
                  <Tab>Bills</Tab>
                </TabList>

                <TabPanel className="my-3">
                  <h2>Content 1</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Content 2</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Content 3</h2>
                </TabPanel>
              </Tabs>
            </div>

            <Link
              to={`/projects/${state.id}/floor-details`}
              state={state}
              className="absolute bg-blue-500 h-12 w-12 flex justify-center items-center rounded-full bottom-4 text-white text-xl right-4"
            >
              <FaBuilding />
            </Link>
          </div>
        </div>
      )}

      {/*  */}
      <DetailsModal
        allData={allData}
        onClose={() => setAllData(null)}
        erp_modalCol={12}
        photoSection={false}
      />

      {/*  */}
    </>
  );
}

export default ProjectsDetails;
