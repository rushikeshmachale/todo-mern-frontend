import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    task: "",
  });

  const { task } = todo;

  // console.log(taskVal);
  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get(`http://localhost:4000/get/${id}`);

    setTodo(res.data);
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:4000/update/${id}`, todo)
      .then(() => {
        toast.success("updated");
        navigate("/");
      })
      .catch(() => toast.error("error"));
  };
  return (
    <div className="container">
      <form action="" className=" form-control my-5">
        <h2 className=" text-center my-3">UpdateTask</h2>
        <input
          type="text"
          name="task"
          value={task}
          className=" form-control m-1"
          onChange={handleChange}
          placeholder="Update task"
        />
        <div className="text-center">
        
        <button className="btn btn-info my-2" onClick={submit}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
