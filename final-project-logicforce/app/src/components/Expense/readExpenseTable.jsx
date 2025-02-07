import React, { useEffect, useState } from 'react';
import styleExpense from '../../styles/Expense.module.scss';
import style from '../../styles/allStyles.module.scss';
import { useMutation } from "react-query";
import { addUser } from "../../lib/helper";
import emailjs from "emailjs-com";

export default function Table() {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, getname] = useState("");
  const [updateMsg, getUpdateMsg] = useState(false);
  const [categoryExpense, getCategoryExpense] = useState("");
  const [description, getdescription] = useState("");
  const [amountExpense, getamountExpense] = useState("");
  const [uniqId, getUniqId] = useState("");
  const [selected, setselected] = useState(true);
  const [dateInfo, setDateInfo] = useState("");

  const [selects, setSelects] = useState("");
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  const [clearTaskList, setClearTaskList] = useState(false);
  const [addTaskFlag, setAddTaskFlag] = useState(false);

  useEffect(() => {
    if (clearTaskList && updateMsg) {
      getUpdateMsg(false);
    }

    if (clearTaskList && addTaskFlag) {
      clearInnerHTML();
      getExpense();
      setAddTaskFlag(false);
    }

    if (firstPageLoad) {
      getExpense();
      setFirstPageLoad(false);
      setClearTaskList(true);
    }
  });

  const handleclick = () => {
    setShow(!show);
  };

  const handleclickAdd = () => {
    setShowAdd(!showAdd);
  };

  const getUpdateTask = async (task) => {
    getname(task.name);
    getCategoryExpense(task.category);
    getdescription(task.description);
    getamountExpense(task.expense);
    setDateInfo(task.date);
    getUniqId(task._id);
    getUpdateMsg(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.length === 0) return console.log("Dont have form data");
    let userId = localStorage.getItem("loggedInUserId");
    const formData = {
      name: e.currentTarget[0].value,
      userId,
      category: e.currentTarget[1].value,
      description: e.currentTarget[2].value,
      expense: e.currentTarget[3].value,
      date: e.currentTarget[4].value,
      status: e.currentTarget[5].checked ? "Active" : "InActive",
    };
    console.log("formData:", formData);
    const Options = {
      method: "POST",
      body: JSON.stringify(formData),
    };
    const response = await fetch(`/api/expense`, Options);
    sendEmail(formData);
    setAddTaskFlag(true);
    setShowAdd(!showAdd);
  };

  async function getCurrentExpenseByCatergory(userId, category, getByMonth) {
    let responseExpense;
    var date = new Date();
    let currMonth = date.getMonth() + 1;
    if (getByMonth) {
      responseExpense = await fetch(
        `/api/getExpense` +
          "?userId=" +
          userId +
          "&category=" +
          category +
          "&month=" +
          currMonth +
          "&year=" +
          date.getFullYear()
      );
    } else {
      responseExpense = await fetch(
        `/api/getExpense` + "?userId=" + userId + "&category=" + category
      );
    }

    let expense = await responseExpense.json();
    let currNum = 0;
    if (expense.message.length > 0) {
      for (let i = 0; i < expense.message.length; i++) {
        let curr = parseInt(expense.message[i].expense);
        currNum += curr;
      }
    }
    return currNum;
  }

  async function sendEmail(formdata) {
    let userId = localStorage.getItem("loggedInUserId");
    let date = formdata.date.split("-");
    let year = date[0];
    let month = date[1];
    let category = formdata.category;
    const responseBudget = await fetch(
      `/api/budget` + "?userId=" + userId + "&year=" + year + "&month=" + month
    );
    let budget = await responseBudget.json();
    if (budget.message.length > 0) {
      let money = 0;
      await getCurrentExpenseByCatergory(userId, category, true).then(function (res) {
        money = parseInt(res);
      });
      let allType = Object.keys(budget.message[0]);
      let index = 0;
      for (let i = 0; i < allType.length; i++) {
        if (allType[i] == category.toLowerCase()) {
          index = i;
          break;
        }
      }
      let currBudget = parseInt(Object.values(budget.message[0])[index]);
      if (currBudget < money && currBudget !== 0) {
        let email = localStorage.getItem("userEmail");
        let name = localStorage.getItem("userName");
        let keyMsg = {
          name: name,
          category: category,
          user_email: email,
        };
        emailjs.send(
          "service_n0dnl2r",
          "template_00bdf3x",
          keyMsg,
          "YNqoPB569X-IinbCW"
        );
      }
    }
  }

  const deleteTask = async (task) => {
    let taskId = task._id;
    const Options = {
      method: "DELETE",
      body: taskId,
    };
    await fetch('/api/expense', Options);
    setAddTaskFlag(true);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (e.currentTarget.length === 0) return console.log("Dont have form data");
    const formData = {
      name: e.currentTarget[0].value,
      category: e.currentTarget[1].value,
      description: e.currentTarget[2].value,
      expense: e.currentTarget[3].value,
      uniqId: uniqId,
    };
    console.log("formData:", formData);
    const Options = {
      method: "PUT",
      body: JSON.stringify(formData),
    };
    console.log("uniqId:", uniqId);
    const response = await fetch(`/api/expense`, Options);
    let sendEmailData = formData;
    sendEmailData.date = dateInfo;
    sendEmail(sendEmailData);
    setAddTaskFlag(true);
    setShow(!show);
  };

  const getExpense = async () => {
    let userId = localStorage.getItem("loggedInUserId");
    const response = await fetch(`/api/expense?userId=` + userId);
    let data = await response.json();
    await addTr(data);
  };

  const addTr = async (data) => {
    let expenseArea = document.getElementById('tableShow');
    for (let i = 0; i < data.message.length; i++) {
      expenseArea.append(await trList(data.message[i]));
    }
  };

  const trList = async (data) => {
    let tr = document.createElement('Tr');
    let td1 = document.createElement('Td');
    td1.innerHTML = data.name;
    let td2 = document.createElement('Td');
    td2.innerHTML = data.category;
    let td3 = document.createElement('Td');
    td3.innerHTML = data.description;
    let td4 = document.createElement('Td');
    td4.innerHTML = data.expense;
    let td5 = document.createElement('Td');
    td5.innerHTML = data.date;
    let td6 = document.createElement('Td');
    let td6btn = document.createElement('Button');
    td6btn.innerHTML = "Delete";
    td6btn.classList.add(selected ? styleExpense.formDeletebtn : '');
    td6btn.addEventListener('click', function () { deleteTask(data) }, false);
    td6.appendChild(td6btn);
    let td7 = document.createElement('Td');
    let td7btn = document.createElement('Button');
    td7btn.addEventListener('click', function () { handleclick(), getUpdateTask(data) });
    td7btn.classList.add(selected ? styleExpense.formUpdatebtn : '');
    td7btn.innerHTML = "Update";
    td7.appendChild(td7btn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    return tr;
  };

  const clearInnerHTML = async () => {
    document.getElementById('tableShow').innerHTML = '';
  };

  return (
    <div>
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background: linear-gradient(135deg, #0F4C81, #1A1F71, #2A9D8F, #264653);
          background-size: 400% 400%;
          animation: gradientAnimation 10s ease infinite;
        }
      `}</style>

      <div><button className={styleExpense.addNewExpense} onClick={function () { handleclickAdd() }}>Add Expense</button></div>

      <div>
        {showAdd ? <form className={styleExpense.expenseForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Name</label>
            <input className={styleExpense.forminput} type="text" name="name" required />
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Category</label>
            <select required name="category" className={styleExpense.forminput} value={selects} onChange={e => setSelects(e.target.value)}>
              <option>Food</option>
              <option>Entertainment</option>
              <option>Medical</option>
              <option>Self Care</option>
              <option>Housing</option>
              <option>Travel</option>
            </select>
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Description</label>
            <input required className={styleExpense.forminput} type="text" name="description" />
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Amount</label>
            <input required className={styleExpense.forminput} type="text" name="expense" />
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Date</label>
            <input required className={styleExpense.forminput} type="date" name="date" />
          </div>
          <button className={styleExpense.newtask}>ADD</button>
        </form> : <></>}
      </div>

      <div>
        {show ? <form className={styleExpense.expenseForm} onSubmit={(e) => handleSubmitUpdate(e)}>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Name</label>
            <input required className={styleExpense.forminput} defaultValue={name} key={name} type="text" name="name" />
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Category</label>
            <select required name="category" className={styleExpense.forminput}>
              <option>{categoryExpense}</option>
              <option>Entertainment</option>
              <option>Medical</option>
              <option>Food</option>
              <option>Self Care</option>
              <option>Housing</option>
              <option>Travel</option>
            </select>
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Description</label>
            <input required className={styleExpense.forminput} defaultValue={description} key={description} type="text" name="description" />
          </div>
          <div className={styleExpense.expenseInfo}>
            <label className={styleExpense.formlabel}>Expense Amount</label>
            <input required className={styleExpense.forminput} defaultValue={amountExpense} key={amountExpense} type="text" name="expense" />
          </div>
          <button className={styleExpense.newtask}>Update</button>
        </form> : <></>}
      </div>

      <table className={styleExpense.tableStyle}>
        <thead>
          <tr className={styleExpense.tableStyleRow}>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Name</span>
            </th>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Category</span>
            </th>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Description</span>
            </th>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Amount</span>
            </th>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Date</span>
            </th>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Delete</span>
            </th>
            <th className={styleExpense.tableStyleTH}>
              <span className={styleExpense.tableStyleLabel}>Update</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200" id="tableShow">
        </tbody>
      </table>
    </div>
  );
}