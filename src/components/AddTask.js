import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const AddTask = () => {
  const [list, setList] = useState({
    task: "",
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { task } = list;
  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (w) => {
    w.preventDefault();

    await axios
      .post("http://localhost:4000/add", { task: task })
      .then(() => {
        
        toast.success("task added");
        loadData()
      })
      .catch(() => toast.error("task already added"));
  };

  const [todo, setTodo] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get("http://localhost:4000/getall");
    setTodo(result.data);
  };
  
  const deleteTask=async(id)=>{
    
    await axios.delete(`http://localhost:4000/delete/${id}`)
    .then(()=>{
      console.log('deleted')
      loadData()
    })
    .catch(()=>console.log('error'))

  }
  return (
    <div className="container">
      <form action="" className="form-control my-5">
        {msg}
        <ToastContainer/>
        <h2 className="text-center">Todo</h2>
        <input
          type="text"
          className="form-control"
          name="task"
          value={task}
          onChange={handleChange}
          id=""
          placeholder="Enter task here"
        />
        <div className="text-center">
        <button className="btn btn-info my-2" onClick={handleSubmit}>
        Submit
        </button>
        </div>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Date</th>
              <th className="text-center">Action</th>

            </tr>
          </thead>
          <tbody>
            {todo.map((x, id) => (
              <tr key={id}>
                <td>{x.task}</td>
                <td>{x.createdAt.substring(0,10)}</td>
                <td className="text-center">
                <Link className="btn btn-info" to={`/edit/${x._id}`}>Edit</Link>
                <button  className="btn btn-danger mx-2" onClick={()=>deleteTask(x._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default AddTask;
