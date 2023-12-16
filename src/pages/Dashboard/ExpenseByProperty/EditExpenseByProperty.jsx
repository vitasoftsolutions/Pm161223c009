import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";
import {
  fetchExpenseByProperty,
  updateExpenseByProperty,
} from "../../../redux/Actions/ExpenseByPropertyAction";

function EditExpenseByProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.expenseByPropertyReducer);
  const propertyState = useSelector((state) => state.propertyReducer.data);
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchExpenseByProperty(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchPropertyAllList());
  }, [dispatch]);

  //
  const formsData = [
    {
      fieldName: "Reason",
      fieldType: "text",
      fieldPlaceholder: "Reason",
      isRequired: true,
      hasWidth: 2,
      defaultValue: state.reason,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
      defaultValue: state.amount,
    },
    {
      fieldName: "Expenser name",
      fieldType: "text",
      fieldPlaceholder: "Expenser name",
      isRequired: true,
      defaultValue: state.expenser_name,
      hasWidth: 2,
    },
    {
      fieldName: "Expense date",
      fieldType: "date",
      fieldPlaceholder: "Expense date",
      isRequired: true,
      defaultValue: state.expense_date,
    },
    {
      fieldName: "Property id",
      fieldType: "select",
      fieldPlaceholder: "Property id",
      isRequired: true,
      defaultValue: state.property_id,
      hasWidth: 2,
      options: propertyState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.code,
      })),
    },
    {
      fieldName: "Type",
      fieldType: "select",
      fieldPlaceholder: "Type",
      isRequired: false,
      defaultValue: state.type,
    },
    {
      fieldName: "Reciept",
      fieldType: "file",
      fieldPlaceholder: "Reciept",
      isRequired: true,
      defaultValue: state.reciept,
    },
  ];

  const submitFunction = (data) => {
    const reciept = data.reciept ? data.reciept : "";

    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        // 
        reason: data.reason ? data.reason : state.reason,
        amount: data.amount ? data.amount : state.amount,
        expenser_name: data.expenser_name ? data.expenser_name : state.expenser_name,
        expense_date: data.expense_date ? data.expense_date : state.expense_date,
        property_id: data.property_id ? data.property_id : state.property_id,
        type: data.type ? data.type : state.type,
        status: data.status ? data.status : state.status,
      };

      // Dispatch when reciept length is greater than 0
      if (reciept !== "") {
        dispatch(
          updateExpenseByProperty({
            id: state.id,
            data: { ...updateData, reciept: reciept },
          })
        );
      }

      dispatch(
        updateExpenseByProperty({
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
        navigate("/expense-by-property");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/expense-by-property"}
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

export default EditExpenseByProperty;
