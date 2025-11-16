"use client"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

export default function Home() {
  const counter = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      
    </>
  );
}
