"use client"
import { ModeToggle } from "@/components/ToggleMode";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { decrement, increment } from "@/redux/slice/counterSlice";

export default function Home() {
  const counter = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
    <div>
      <ModeToggle />  
    </div>

    <div>
      <button onClick={() => dispatch(decrement())}> - </button>
      {counter}
      <button onClick={() => dispatch(increment())}> + </button>
    </div>
    </>
  );
}
