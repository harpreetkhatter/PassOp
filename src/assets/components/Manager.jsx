import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
    id: uuidv4(),
  });
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    let passwordsString = localStorage.getItem("passwords");
    if (passwordsString) {
      let savedPasswords = JSON.parse(passwordsString);
      setPasswords(savedPasswords);
    }
  }, []);

  const saveToDb = (passwords) => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  };

  const ref = useRef();
  const passwordref = useRef();

  const showPassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("/icons/eyecross.svg")) {
      ref.current.src = "/icons/eye.svg";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "/icons/eyecross.svg";
      passwordref.current.type = "password";
    }
  };

  const setPassword = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const savePassword = (e) => {
    if (
      form.site.length > 2 &&
      form.username.length > 2 &&
      form.password.length > 2
    ) {
      const updatedPasswords = [...passwords, form];
      setPasswords(updatedPasswords);
      saveToDb(updatedPasswords);
      console.log(updatedPasswords);
      setForm({ site: "", username: "", password: "", id: uuidv4() });
    } else {
      e.target.className =
        "disabled bg-green-400 rounded-full px-10 py-2 text-md flex gap-1 w-fit border border-green-700 hover:border hover:border-white hover:bg-green-300";
      alert("minimum 3 characters required");
    }
  };

  const deletepassword = (id) => {
    let newPasswords = passwords.filter((item) => item.id != id);
    setPasswords(newPasswords);
    console.log(newPasswords);
    saveToDb(newPasswords);
  };

  const editpassword = (id) => {
    let updatePassword = passwords.filter((item) => item.id === id);
    setForm(updatePassword[0]);
    let newPasswords = passwords.filter((item) => item.id != id);
    setPasswords(newPasswords);
  };

  const copypassword = (text) => {
    navigator.clipboard.writeText(text)
   }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container  mx-auto w-[60%] rounded-md min-h-[72vh] my-10">
        <div>
          <div className="logo text-4xl font-bold cursor-pointer text-center">
            <span className="text-green-400 ">&lt;</span>
            <span>
              pass<span className="text-green-400">OP</span>
            </span>
            <span className="text-green-400">&gt;</span>
          </div>
          <h2 className="text-center text-lg p-1 font-semibold ">
            Your own Password Manager
          </h2>
          <div className="flex flex-col gap-6 py-4">
            <input
              value={form.site}
              type="text"
              name="site"
              id="site"
              onChange={setPassword}
              placeholder="Enter website URL"
              className=" w-full rounded-full border border-green-700 px-4 py-1"
            />

            <div className="flex gap-8  ">
              <input
                value={form.username}
                onChange={setPassword}
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className="w-full rounded-full border border-green-700 px-4 py-1 "
              />

              <input
                type="password"
                onChange={setPassword}
                value={form.password}
                name="password"
                ref={passwordref}
                placeholder="Enter password"
                className=" rounded-full border border-green-700 px-4 py-1 w-full "
                id="password"
              />
              <img
                src="/icons/eyecross.svg"
                alt=""
                width={20}
                className="absolute bottom-[450px] right-[330px] "
                onClick={showPassword}
                ref={ref}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-green-400 rounded-full px-10 py-2 text-md flex gap-1 w-fit border border-green-700 hover:border hover:border-white hover:bg-green-300"
              onClick={savePassword}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
              </svg>
              Save
            </button>
          </div>

          <h2 className="text-xl font-bold pt-7">Your Passwords</h2>
          <div className="pt-4">
            {passwords.length == 0 && (
              <div className="font-bold p-1">no passwords to show</div>
            )}
            {passwords.length != 0 && (
              <table className="table-auto  rounded-xl overflow-hidden w-[100%]  ">
                <thead className="bg-green-900 text-white ">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                {passwords.map((item) => {
                  return (
                    <tbody className="bg-green-100" key={item.id}>
                      <tr>
                      <td className=" py-2 text-center min-w-40 border border-white">
                      <div className="flex justify-around items-center"><a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div className="cursor-pointer" onClick={()=>copypassword(item.site)}><img src="/icons/copy.svg" alt=""  width={20}/></div></div>
                          
                        </td>
                      <td className=" py-2 text-center min-w-40 border border-white">
                      <div className="flex justify-around items-center">
                          {item.username}
                          <div className="cursor-pointer" onClick={()=>copypassword(item.username)}><img src="/icons/copy.svg" alt=""  width={20}/></div></div>
                        </td>
                      <td className=" py-2 text-center min-w-40 border border-white">
                      <div className="flex justify-around items-center">
                          {item.password}
                          <div className="cursor-pointer" onClick={()=>copypassword(item.password)}><img src="/icons/copy.svg" alt=""  width={20}/></div></div>
                        </td>
                        <td className=" py-2 text-center min-w-40 border border-white  ">
                          <div className="flex justify-around ">
                            <span
                              className="cursor-pointer"
                              onClick={() => editpassword(item.id)}
                            >
                              <img src="/icons/save.svg" alt="" width={20} />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => deletepassword(item.id)}
                            >
                              <img src="/icons/delete.svg" alt="" width={20} />
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
