import  { useState } from 'react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

function LoginForm({ setLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmail(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    localStorage.setItem("details", JSON.stringify(formData));
    toast.success("Login successful");
    setLogin(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <form onSubmit={handleLogin} className="p-4 border border-gray-300 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Enter your name"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  setLogin: PropTypes.func.isRequired
};

export default LoginForm;
