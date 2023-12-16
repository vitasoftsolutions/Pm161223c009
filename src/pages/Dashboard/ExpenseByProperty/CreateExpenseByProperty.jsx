import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createExpenseByProperty } from "../../../redux/Actions/ExpenseByPropertyAction";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";

function CreateExpenseByProperty() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.expenseByPropertyReducer);
  const propertyState = useSelector((state) => state.propertyReducer.data);
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createExpenseByProperty(data));
  };

  useEffect(() => {
    dispatch(fetchPropertyAllList());
  }, [dispatch]);

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  //
  const formsData = [
    {
      fieldName: "Reason",
      fieldType: "text",
      fieldPlaceholder: "Reason",
      isRequired: true,
      hasWidth: 2,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
    },
    {
      fieldName: "Expenser name",
      fieldType: "text",
      fieldPlaceholder: "Expenser name",
      isRequired: true,
      hasWidth: 2,
    },
    {
      fieldName: "Expense date",
      fieldType: "date",
      fieldPlaceholder: "Expense date",
      isRequired: true,
    },
    {
      fieldName: "Property id",
      fieldType: "select",
      fieldPlaceholder: "Property id",
      isRequired: true,
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
    },
    {
      fieldName: "Reciept",
      fieldType: "file",
      fieldPlaceholder: "Reciept",
      isRequired: true,
    },
    {
      fieldName: "Author id",
      fieldType: "number",
      fieldPlaceholder: "Author id",
      defaultValue: userId,
      isRequired: true,
      isHidden: true,
    },
  ];

  useEffect(() => {
    if (loanState.isCreated) {
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

    if (loanState.isError) {
      toast.error(loanState.data[0], {
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
  }, [loanState.isError, loanState.data, loanState.isCreated, navigate]);

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

export default CreateExpenseByProperty;
