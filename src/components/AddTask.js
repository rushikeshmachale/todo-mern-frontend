import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const AddTask = () => {
  const [list, setList] = useState({
    task: "",
  });
  const BASE_URL = "https://amethyst-katydid-wig.cyclic.app"

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { task } = list;
  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (w) => {
    w.preventDefault();

    await axios
      .post(`${BASE_URL}/add`, { task: task })
      .then(() => {
       
        toast.success("task added");
        setList({task:""})
        loadData()
      })
      .catch(() => {
        if(task==""){
          toast.error("please enter task")
        }else{
          toast.error("task already added")
        }
        });
        };

  const [todo, setTodo] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get(`${BASE_URL}/getall`);
    setTodo(result.data);
  };
  
  const deleteTask=async(id)=>{
    
    await axios.delete(`${BASE_URL}/delete/${id}`)
    .then(()=>{
      toast.warn('deleted')
      loadData()
    })
    .catch(()=>console.log('error'))

  }
  return (
    <div className="container">
    <ToastContainer className="text-start mx-5"/>
      <form action="" autoComplete="off" className="form-control my-5">
        {msg}
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
            {todo.length>0 ?todo.map((x, id) => (
              <tr key={id}>
                <td>{x.task}</td>
                <td>{x.createdAt.substring(0,10)}</td>
                <td className="text-center">
                <Link className="btn btn-info rounded-5 py-2" to={`/edit/${x._id}`}>📝</Link>
                <button  className="btn btn-danger rounded-5 py-2 mx-2" onClick={()=>deleteTask(x._id)}>🗑</button>
                </td>
              </tr>
            )) : 
          (<div className="card p-3">
            Make your first todo task
            </div>)
          }
          </tbody>
        </table>
    </div>
  );
};

export default AddTask;
