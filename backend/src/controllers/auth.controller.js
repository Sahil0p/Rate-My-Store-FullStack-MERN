// import { signupUser, loginUser, updatePassword } from "../services/auth.service.js";

// export const signup = async (req, res) => {
//   try {
//     const user = await signupUser(req.body);
//     res.status(201).json({ msg: "Signup successful", user });
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { token, user } = await loginUser(req.body.email, req.body.password);
//     res.json({ token, user });
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };

// export const changePassword = async (req, res) => {
//   try {
//     await updatePassword(req.user._id, req.body.password);
//     res.json({ msg: "Password updated" });
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };


import {
    signupUser,
    loginUser,
    updatePassword,
  } from "../services/auth.service.js";
  
  /**
   * Signup Controller
   * - Allows USER and OWNER signup
   * - Blocks ADMIN role from frontend
   */
  export const signup = async (req, res) => {
    try {
      const { name, email, password, address } = req.body;
  
      // 🔐 Secure role handling
      let role = "USER";
      if (req.body.role === "OWNER") {
        role = "OWNER";
      }
  
      const user = await signupUser({
        name,
        email,
        password,
        address,
        role,
      });
  
      res.status(201).json({
        msg: "Signup successful",
        user,
      });
    } catch (e) {
      res.status(400).json({
        msg: e.message,
      });
    }
  };
  
  /**
   * Login Controller
   */
  export const login = async (req, res) => {
    try {
      const { token, user } = await loginUser(
        req.body.email,
        req.body.password
      );
  
      res.json({ token, user });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  };
  
  /**
   * Change Password Controller
   */
  export const changePassword = async (req, res) => {
    try {
      await updatePassword(req.user._id, req.body.password);
      res.json({ msg: "Password updated" });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  };
  