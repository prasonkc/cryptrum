"use client"
import React, { use, useState } from "react";

const ResetPassword = () => {
    const [email, setEmail] = useState<string>("");
  return (
    <div>
      <form action="POST">
        <input type="email" placeholder="example@yourmail.com" onChange={(e) => {setEmail(e.target.value)}}/>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(email)
          }}
        >
          Reset your password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
