"use client";
import React from "react";
import {  useEffect } from "react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Toaster } from "@/components/ui/sonner";
import {  clearError } from "@/redux/slice/ErrorSlice";

const ToastError = () => {
  const error = useSelector((state: RootState) => state.error.value);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError())
    }
  }, [error, dispatch]);

  return <Toaster />;
};

export default ToastError;
