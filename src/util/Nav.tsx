import React, { createContext, ReactNode, useReducer } from "react";

interface Props {
  children: ReactNode;
}

interface IAction {
  type: string;
  node: any;
}

export interface INavContext {
  navs: Array<any>;
  dispatch: React.Dispatch<IAction>;
}

export const NavContext = createContext<INavContext | null>(null);
export const ADD_NODE = "ADD_NODE";
const reducer = (state: Array<any>, action: IAction) => {
  switch (action.type) {
    case ADD_NODE:
      return [...state, action.node];
    default:
      return state;
  }
};

export const Nav = (props: Props) => {
  const [navs, dispatch] = useReducer(reducer, []);
  return (
    <NavContext.Provider value={{ navs, dispatch }}>
      {props.children}
    </NavContext.Provider>
  );
};
